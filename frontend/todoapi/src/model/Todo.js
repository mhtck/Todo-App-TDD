class Todo {
  constructor(content, id) {
    this.id = id;
    this.content = content;
  }

  static validateContent(todo) {
    if (typeof (todo.content) !== "string") {
      throw new Error(
        `Todo name must be a string! Invalid value: ${todo.content}`
      );
    }
  }

  static validateId(todo) {
    if (typeof todo.id !== "number") {
      throw new Error(`Todo id must be a number! Invalid value: ${todo.id}`);
    }
  }
}

export default Todo;
