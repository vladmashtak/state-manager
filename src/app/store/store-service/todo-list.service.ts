import { Injectable } from '@angular/core';
import { EntityState } from '../state/entity-state';
import { TodoList } from '../store-entities/todo-list.entity';
import { Todo } from '../store-entities/todo.entity';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  public todoList: EntityState<TodoList>;

  constructor() {
    this.todoList = new EntityState<TodoList>([]);
  }

  public addNewTodo(title: string, description: string): void {
    this.todoList.updateState((state: TodoList) => {
      const entity: Todo = <Todo>{
        id: 1,
        title: title,
        description: description,
        createdAt: '1.12.2018'
      };

      return [entity, ...state];

    });
  }

  public removeTodo(index: number): void {
    this.todoList.updateState((state: TodoList) => {
      const newState: TodoList = [...state];
      newState.splice(index, 1);

      return newState;
    });
  }
}
