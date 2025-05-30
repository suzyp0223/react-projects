import { Tag, Todo } from "../type";

export default function tagTemplate(tags: Todo["tags"], todoId: Todo["id"]) {
  return `
  <div class="tags">
  ${
    tags &&
    tags
      .map(({ id, content }: Tag) => {
        return `
        <span class="tag" id="tag-${todoId}">
          ${content}
          <button class="delete-tag delete-btn" id="todo-delete-${id}"></button>
        </span>`;
      })
      .join("")
  }

  <div class="tag add-tag-btn" >
    <span contentEditable>태그</span>
    <button class="add-btn" id="todo-${todoId}"></button>
  </div>

</div>
  `;
}
