type Content = {
  title: string;
  body: string;
};

export type Tag = {
  id: string;
  content: string;
};

export interface Todo {
  id: string;
  content: Content;
  isDone: boolean;
  category: string;
  tags?: Tag[];
}

export interface InProgressTodo extends Todo {
  isDone: false;
}
export interface DoneTodo extends Todo {
  isDone: true;
}

export interface TodoList {
  id: string;
  title: string;
  list: Todo[];
}

export function isButtonElement(
  targetElement: HTMLElement | EventTarget
): targetElement is HTMLButtonElement {
  return targetElement && targetElement instanceof HTMLButtonElement;
}
