import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from 'src/app/models/books/bookModel';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.scss'],
})
export class FormBookComponent implements OnInit {
  isUpdate: boolean = false;
  idBook: string | null = null;
  bookToUpdate: BookModel | null = null;
  bookForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private bookService: BookServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });
    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/update')) {
      this.isUpdate = true;
      this.idBook = this.route.snapshot.paramMap.get('id');
      this.getBook(this.idBook ?? '');
    }
  }

  getBook(id: string) {
    this.bookService.getBook(id).subscribe(
      (res: BookModel) => {
        this.bookToUpdate = res;
        this.bookForm = this.fb.group({
          id: [this.bookToUpdate.id],
          title: [this.bookToUpdate?.title, Validators.required],
          author: [this.bookToUpdate?.author, Validators.required],
          year: [
            this.bookToUpdate?.year,
            [Validators.required, Validators.pattern('^[0-9]{4}$')],
          ],
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(): void {
    if (this.isUpdate && this.bookForm.valid) {
      this.bookService.updateBook(this.bookForm.value).subscribe(
        (res) => {
          this.snackBar.open('Book updated successfully', '✔️', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.router.navigate(['']);
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
    } else if (!this.isUpdate && this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(
        (res) => {
          this.snackBar.open('Book created successfully', '✔️', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.router.navigate(['']);
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
    } else {
      this.snackBar.open('Bad input', '❌', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }
  cancel(): void {
    this.router.navigate(['']);
  }
}
