import "./style.css";

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

class TodoApp {
  todoList: Todo[];
  constructor() {
    this.todoList = [];
    this.initEvent();
  }

  initEvent() {
    const inputEl = document.querySelector("#todo-input");
    inputEl?.addEventListener("keydown", this.addTodo.bind(this));
  }

  addTodo(event: KeyboardEventInit) {
    if (event.key !== "Enter") {
      return;
    }

    const target = <HTMLInputElement>(event as KeyboardEvent).target;

    if (!target.value) {
      return;
    }

    this.todoList.push({
      id: this.todoList.length + 1,
      isDone: false,
      content: target.value,
    });

    target.value = "";

    this.render(this.todoList);
  }

  /**
   * 모든 할 일을 조회할 수 있다.
   *
   * @returns {todo[]}  전체 할일
   */
  getTodoList() {
    return this.todoList;
  }

  /**
   * 모든 할 일을 필터링할 수 있다.
   * @returns {Todo[]} 필터링된 할일
   */
  // getTodoListByFilter(filterType) {}

  /**
   * 할 일의 내용과 상태를 수정할 수있다.
   *
   * @param {Object} todo - 수정될 할 일
   * @param {string} [todo.text] - 수정될 내용
   * @param {string} [todo.status] - 수정될 상태
   */
  // updateTodo({ id, text, status }) {}

  /**
   * 특정 할 일을 제거할 수 있다.
   *
   * @param {number} id
   */
  // removeTodo(id:) {}

  generateTodoList(todo: Todo) {
    const containerEl = document.createElement("div");
    const todoTemplate = `<div class="item__div">
    <input type='checkbox' ${todo.isDone && "checked"} />
    <div class='content ${todo.isDone && "checked"}' contentEditable>${
      todo.content
    }</div>
    <button class="todoButton">X</button>
    </div>`;

    containerEl.classList.add("item");
    containerEl.innerHTML = todoTemplate;

    return containerEl;
  }

  // Todo[] = [] 호출 시 인자가 없으면 빈 배열이 자동으로 전달.
  render(todoList: Todo[] = []) {
    const todoListEl = document.querySelector(".todo-items");

    // const todoCountEl = <HTMLSpanElement>document.querySelector("#todo-count");
    // todoCountEl?.replaceChildren();

    // // 3가지 방법 다 같은 동작.
    // // todoListEl?.replaceChildren();
    // if (todoListEl) {
    //   todoListEl.innerHTML = "";
    //   // todoListEl.replaceChildren();
    // }

    // const currentTodoList = this.getTodoListByFilter(this.filterStatus);

    // 가상의 돔. 실질적으로 그려지지않은 상태
    const fragment = document.createDocumentFragment();
    const todoListComponent = todoList.map((todo) =>
      this.generateTodoList(todo)
    );

    if (todoListComponent) {
      fragment.append(...todoListComponent);
      todoListEl?.appendChild(fragment); //?를 넣으면 ?앞 값이 존재할때만 동작 아래 타입가드와 동일함.
    }
  }
}

const todoApp = new TodoApp();
todoApp.render();
