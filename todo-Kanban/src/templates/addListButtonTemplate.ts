import { TodoList } from "../type";

export function addListButtonTemplate(title: TodoList["title"]) {
  return `
      <section class="todo">
        <button class="todo-item add" id="add-todo-${title}">
          <span class="plus-btn blue"></span>
        </button>
      </section>`;
}
