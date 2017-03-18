import {TestBed, inject} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoDataService} from './todo-data.service';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('should ...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {

    it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
      const todoValues1 = {title: 'Hello 1', complete: false};
      const todoValues2 = {title: 'Hello 2', complete: true};
      service.createTodo(todoValues1);
      service.createTodo(todoValues2);
      expect(service.getAllTodos()).toEqual([new Todo(todoValues1), new Todo(todoValues2)]);
    }));

  });

  describe('#save(todo)', () => {

    it('should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
      const todoValues1 = {title: 'Hello 1', complete: false};
      const todoValues2 = {title: 'Hello 2', complete: true};
      service.createTodo(todoValues1);
      service.createTodo(todoValues2);
      expect(service.getTodoById(1)).toEqual(new Todo(todoValues1));
      expect(service.getTodoById(2)).toEqual(new Todo(todoValues2));
    }));

  });

  describe('#deleteTodoById(id)', () => {

    it('should remove todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
      const todoValues1 = {title: 'Hello 1', complete: false};
      const todoValues2 = {title: 'Hello 2', complete: true};
      service.createTodo(todoValues1);
      service.createTodo(todoValues2);
      const todo1 = new Todo(todoValues1);
      const todo2 = new Todo(todoValues2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should throw exception when deleting non-existent id', inject([TodoDataService], (service: TodoDataService) => {
      expect(() => {
        service.deleteTodoById(3)
      }).toThrowError('Todo ID: 3 cannot be deleted.');
    }));

  });

  describe('#updateTodoById(id, values)', () => {

    it('should return todo with the corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Hello 1', complete: false});
      service.createTodo(todo);
      const updatedTodo = service.updateTodoById(1, {
        title: 'new title'
      });
      expect(updatedTodo.title).toEqual('new title');
    }));

    it('should throw exception when updating non-existent id', inject([TodoDataService], (service: TodoDataService) => {
      expect(() => {
        service.updateTodoById(2, {})
      }).toThrowError("Todo ID: 2 cannot be updated because it doesn't exist.");
    }));

  });

  describe('#toggleTodoComplete(todo)', () => {
    it('should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
      const todo = {title: 'Hello 1', complete: false};
      const todoId = service.createTodo(todo);

      const updatedTodo = service.toggleTodoComplete(todoId);
      expect(updatedTodo.complete).toEqual(true);

      const updatedTodo2 = service.toggleTodoComplete(todoId);
      expect(updatedTodo2.complete).toEqual(false);
    }));

  });

});
