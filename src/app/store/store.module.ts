import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListService } from './store-service/todo-list.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TodoListService
  ],
})
export class StoreModule {}
