import {Injectable} from '@angular/core';
import {Todo} from "./todo";

@Injectable()
export class TodoDataService {
  // Placeholder for last id so we can simulate automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for todo's
  todos: Map<number, Todo> = new Map<number, Todo>();


  // Simulate POST /todos
  createTodo(values: Object): number {
    const newId = ++this.lastId;
    this.todos.set(newId, new Todo(values));
    return newId;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number) {
    const deleted = this.todos.delete(id);
    if (!deleted)
      throw new Error(`Todo ID: ${id} cannot be deleted.`);
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.todos.get(id);
    if (todo === undefined)
      // return null;
      throw new Error(`Todo ID: ${id} cannot be updated because it doesn't exist.`);

    const updatedTodo = new Todo(Object.assign(todo, values));
    this.todos.set(id, updatedTodo);
    return updatedTodo
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    return Array.from(this.todos.values());
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    const todo = this.todos.get(id);
    if (todo === undefined) {
      throw new Error(`Todo ID: ${id} cannot be retrieved because it doesn't exist.`);
    }
    return todo;
  }

  // Toggle todo complete
  toggleTodoComplete(id: number): Todo {
    const todo = this.getTodoById(id);
    return this.updateTodoById(id, {
      complete: !todo.complete
    });
  }

}
