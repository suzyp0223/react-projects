import "./style.css";

import { v4 as uuidv4 } from "uuid";
import { defaultKanban } from "./mock";

import {
  addListButtonTemplate,
  cardTemplate,
  listContainerTemplate,
  listHeaderTemplate,
} from "./templates";

import {
  InProgressTodo,
  isButtonElement,
  Tag,
  type Todo,
  type TodoList,
} from "./type";

class KanbanApp {
  kanban: TodoList[];

  constructor(data: TodoList[]) {
    this.kanban = data;

    this.mount();
  }

  render() {
    //kanban 만들수 있는 버튼
    const addListButton = document.createElement("button");
    addListButton.classList.add("board", "add");
    addListButton.innerHTML = `<span class="plus-btn blue"></span>`;

    const board = document.querySelector(".todo-container");

    if (board) {
      board.innerHTML = "";

      // createDocumentFragment() => 가상 DOM 컨테이너.
      // DocumentFragment를 사용하면 리플로우(Reflow)와 리페인트(Repaint)를 최소화.
      // 브라우저가 불필요한 렌더링을 줄일 수 있음.  메모리 내에서만 존재.
      // fragment를 appendChild() 또는 append()를 사용해 실제 DOM에 추가하면,
      // fragment 자체는 사라지고 내부의 요소들만 남음.
      const fragment = document.createDocumentFragment();
      const kanbanElements = this.kanban.map((todo) => this.generateList(todo));

      fragment.append(...kanbanElements);
      board.append(fragment, addListButton);
    }
  }

  attachEvent() {
    const $addListButton = document.querySelector(".board.add");
    const $removeListButton = document.querySelectorAll(".kanban-delete");
    const $addTodoButton = document.querySelectorAll(".todo-item.add");
    const $removeTodoButton = document.querySelectorAll(".delete-item");
    const $addTagButton = document.querySelectorAll(".add-btn");
    const $removeTagButton = document.querySelectorAll(".delete-tag");

    // $addListButton?.addEventListener("click", () => alert("test"));
    $addListButton?.addEventListener("click", () => {
      const newId = uuidv4();

      this.kanban = [
        ...this.kanban,
        {
          id: newId,
          title: `kanban-${newId}`,
          list: [],
        },
      ];

      this.mount();
    });

    $removeListButton?.forEach((button) => {
      button?.addEventListener("click", ({ currentTarget }) => {
        const [, selectedId] = (currentTarget as HTMLButtonElement).id.split(
          "kanban-"
        );

        this.removeList(selectedId);
      });
    });

    $addTodoButton.forEach((button) => {
      button.addEventListener("click", ({ currentTarget }) => {
        if (currentTarget && isButtonElement(currentTarget)) {
          const [, category] = currentTarget.id.split("add-todo-");

          // Todo 추가시 InProgress,Done에도 똑같이 추가
          // prepend - 무언가를 앞에 끼워 넣을수 있는 API. /append-뒤에
          currentTarget?.closest(".wrapper")?.prepend(this.addTodo(category));
        }
      });
    });

    $removeTodoButton.forEach((button) => {
      button.addEventListener("click", ({ currentTarget }) => {
        if (currentTarget && isButtonElement(currentTarget)) {
          const category = currentTarget?.closest(".todo")?.id.split("+")[0];
          const [, selectedId] = currentTarget.id.split("delete-todo-");

          this.removeTodo(selectedId, category);
        }
      });
    });

    $addTagButton.forEach((button) => {
      button.addEventListener("click", ({ currentTarget }) => {
        if (currentTarget && isButtonElement(currentTarget)) {
          const category = currentTarget.closest(".todo")?.id.split("+")[0];
          const selectedId = currentTarget.id.split("todo-")[1];

          const tagContent =
            currentTarget.closest(".tag")?.querySelector("span")?.textContent ??
            ""; // ?? '' 뜻: 없으면 빈문자열

          this.addTag({ category, selectedId, tagContent });
        }
      });
    });

    $removeTagButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        const currentTarget = event.currentTarget as HTMLButtonElement;

        if (currentTarget && isButtonElement(currentTarget)) {
          // ✅ category 추출: 가장 가까운 .todo의 id="InProgress+xxx"
          const category = currentTarget.closest(".todo")?.id.split("+")[0];

          // 삭제될 TodoId
          const selectedTodoId = currentTarget
            .closest(".tag")
            ?.id.split("tag-")[1];
          const [, selectedTagId] = currentTarget.id.split("todo-delete-");

          if (!category || !selectedTodoId || !selectedTagId) {
            console.warn("❗ 추출 실패", {
              category,
              selectedTodoId,
              selectedTagId,
            });
            return;
          }
          this.removeTag({ category, selectedTagId, selectedTodoId });
        }
      });
    });
  }

  // 카테고리받고 거기에 맞는 돔을 만들어 반환
  addTodo(category: Todo["category"]) {
    // console.log('category: ', category);
    const $list = document.createElement("section");
    $list.classList.add("todo");
    $list.setAttribute("id", "add-item");

    $list.innerHTML = cardTemplate();

    $list
      .querySelector(".add")
      ?.addEventListener("click", ({ currentTarget }) => {
        const listId = this.kanban.findIndex(({ title }) => title === category);

        if (currentTarget && isButtonElement(currentTarget)) {
          const $todo = currentTarget.closest(".todo-item");
          const title = $todo?.querySelector(".add-title")?.textContent;
          const body = $todo?.querySelector(".add-content")?.textContent;

          // const newTodoId = this.list?[listId].list.length > 0 ? uuidv4() : 0;

          const newTodo: InProgressTodo = {
            id: uuidv4(),
            content: {
              title: title ?? "", // 기존에 있으면 그대로 사용하고 없으면 우항값을 사용 - 널 병합 연산자
              body: body ?? "",
            },
            isDone: false,
            category: category,
            tags: [],
          };

          this.kanban[listId].list = [...this.kanban[listId].list, newTodo];
          this.mount();
        }
      });
    return $list;
  }

  // category: string = '' 없으면 빈값으로 처리
  removeTodo(selectedId: Todo["id"], category: Todo["category"] = "") {
    //listId- 어떤 리스트에서 지우는지 알아야함
    const listId = this.kanban.findIndex((list) => list.title === category);
    const targetList = this.kanban.find((list) => list.title === category);

    if (targetList) {
      this.kanban[listId].list = targetList.list.filter(
        (todo) => todo.id !== selectedId
      );

      this.mount(); // 변경된 리스트 상태를 화면에 반영
    }
  }

  removeList(selectedId: Todo["id"]) {
    this.kanban = this.kanban.filter((list) => list.id !== selectedId);
    this.mount();
  }

  addTag({
    category,
    selectedId,
    tagContent,
  }: {
    category?: Todo["category"];
    selectedId: Todo["id"];
    tagContent?: Tag["content"];
  }) {
    const listId = this.kanban.findIndex((list) => list.title === category);
    const targetList = this.kanban.find((list) => list.title === category);

    const todo = targetList?.list.find((todo) => todo.id === selectedId);
    const todoIndex = targetList?.list.findIndex(
      (todo) => todo.id === selectedId
    );

    todo?.tags?.push({
      id: uuidv4(),
      content: tagContent ?? "태그",
    });

    if (todoIndex && todo) {
      this.kanban[listId].list.splice(todoIndex, 1, todo);
    }

    this.mount();
  }
  removeTag({
    category,
    selectedTagId,
    selectedTodoId,
  }: {
    category?: Todo["category"];
    selectedTagId: Tag["id"];
    selectedTodoId?: Todo["id"];
  }) {
    const listId = this.kanban.findIndex((list) => list.title === category);
    const targetList = this.kanban.find((list) => list.title === category);

    if (targetList) {
      const todo = targetList.list.find((todo) => todo.id === selectedTodoId);
      const todoIndex = targetList.list.findIndex(
        (todo) => todo.id === selectedTodoId
      );
      const newTags = todo?.tags?.filter((tag) => tag.id !== selectedTagId);

      // ✅ newTags가 undefined일 경우 대비
      this.kanban[listId].list[todoIndex].tags = newTags ?? [];

      this.mount();
    }
  }

  mount() {
    this.render();
    this.attachEvent(); // ⭐️ 이벤트 다시 연결
  }
  generateList({ id, title, list }: TodoList) {
    const $list = document.createElement("section");
    $list.classList.add("board");

    const addButtonElement = addListButtonTemplate(title);

    const listHTML = list
      ?.map(
        ({
          id: todoId,
          content,
          tags,
        }: Pick<Todo, "id" | "content" | "tags">) => {
          return listContainerTemplate({ title, todoId, content, tags });
        }
      )
      .join("");

    const $item = `
    ${listHeaderTemplate({ list, title, id })}
    <div class="wrapper">
    ${addButtonElement}
    ${list?.length ? listHTML : ""}
    </div>`;

    $list.innerHTML = $item;
    return $list;
  }
}

new KanbanApp(defaultKanban);
