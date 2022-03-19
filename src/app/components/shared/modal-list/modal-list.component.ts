import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.css']
})

@Injectable({ providedIn: 'root' })
export class ModalListComponent {
  data: any;
  authors: string;
  categories: string;
  // tslint:disable-next-line:no-output-rename
  constructor(@Inject(MAT_DIALOG_DATA) public dataBook) {
    this.data = dataBook.book;
    this.authors = this.data.volumeInfo.authors.join(',');
    this.categories = this.data.volumeInfo.categories.join(',');
  }

  save(): void {
    const storage = JSON.parse(sessionStorage.getItem('listBooks'));
    const index = storage.findIndex(item => {
      return item.id === this.data.id;
    });
    storage[index] = this.data;
    sessionStorage.setItem('listBooks', JSON.stringify(storage));
    Swal.fire('Excellent', 'The book was edited', 'success');
  }
}
