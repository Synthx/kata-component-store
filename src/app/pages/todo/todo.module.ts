import { NgModule } from '@angular/core';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
    declarations: [TodoComponent],
    imports: [TodoRoutingModule],
})
export class TodoModule {}
