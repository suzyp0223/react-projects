import { TodoList, DoneTodo, InProgressTodo } from "./type";

export const todoList: InProgressTodo[] = [
  {
    id: "0",
    content: { title: "제목", body: "내용" },
    isDone: false,
    category: "to-do",
    tags: [{ id: "0", content: "태그1" }],
  },
];
export const inProgressList: InProgressTodo[] = [
  {
    id: "0",
    content: { title: "제목", body: "내용" },
    isDone: false,
    category: "in-progress",
    tags: [{ id: "0", content: "태그1" }],
  },
];
export const doneList: DoneTodo[] = [
  {
    id: '0',
    content: { title: "제목", body: "내용" },
    isDone: true,
    category: "done",
    tags: [{ id: '0', content: "태그1" }],
  },
];

export const defaultKanban: TodoList[] = [
  { id: '0', title: "To do", list: todoList },
  { id: '1', title: "In progress", list: inProgressList },
  { id: '2', title: "Done", list: doneList },
];
