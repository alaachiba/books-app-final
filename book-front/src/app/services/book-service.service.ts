import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment-dev';
import { BookModel } from '../models/books/bookModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(environment.apiUrl + 'books');
  }

  deleteBook(id: string) {
    return this.http.delete<BookModel[]>(environment.apiUrl + 'books/' + id);
  }

  getBook(id: string): Observable<BookModel> {
    return this.http.get<BookModel>(environment.apiUrl + 'books/' + id);
  }

  updateBook(book: BookModel) {
    return this.http.put<BookModel>(
      environment.apiUrl + 'books/' + book.id,
      book
    );
  }
  
  addBook(book: BookModel) {
    return this.http.post<BookModel>(environment.apiUrl + 'books', book);
  }
}
