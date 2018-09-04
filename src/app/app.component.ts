import { Component, OnInit } from '@angular/core';
import { TodoListService } from './store/store-service/todo-list.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public todoForm: FormGroup;

  constructor(public todoListService: TodoListService,
              private fb: FormBuilder) {
  }


  public ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  public updateTodoList(): void {
    const {title, description} = this.todoForm.value;

    this.todoListService.addNewTodo(title, description);
    this.todoForm.reset();
  }

  public removeTodoItem(index: number): void {
    this.todoListService.removeTodo(index);
  }
}
