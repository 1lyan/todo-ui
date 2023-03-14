declare global {
  interface Window { todoItems: any; }
}

window.todoItems = window.todoItems || {};

export default window;