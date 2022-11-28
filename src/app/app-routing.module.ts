import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'products', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
    { path: 'todo', loadChildren: () => import('./pages/todo/todo.module').then(m => m.TodoModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
