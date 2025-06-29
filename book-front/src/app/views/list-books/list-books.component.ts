import { Component, OnInit, ViewChild } from '@angular/core';
import { BookModel } from 'src/app/models/books/bookModel';
import { BookServiceService } from 'src/app/services/book-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit {
  listBooks: BookModel[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'year',
    'created_at',
    'updated_at',
    'Actions',
  ];

  dataSource = new MatTableDataSource<BookModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private bookService: BookServiceService
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe(
      (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    return `${year}-${month}-${day} : ${hours}:${minutes}`;
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  onEdit(id: string) {
    this.router.navigate(['update', id]);
  }

  onDelete(id: string) {
    const confirmed = confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      this.bookService.deleteBook(id).subscribe(
        (res) => {
          this.fetchBooks();
          this.snackBar.open('Book deleted successfully', '✔️', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        },
        (err) => {
          this.snackBar.open('Server Error', '❌', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  AddBook() {
    this.router.navigate(['add']);
  }
}
