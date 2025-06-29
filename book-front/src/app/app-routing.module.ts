import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from './views/list-books/list-books.component';
import { FormBookComponent } from './views/form-book/form-book.component';

const routes: Routes = [
  { path: '', component: ListBooksComponent },
  { path: 'add', component: FormBookComponent },
  { path: 'update/:id', component: FormBookComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
