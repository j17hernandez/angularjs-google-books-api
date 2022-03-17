import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/services.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  books = [];
  // tslint:disable-next-line:variable-name
  constructor(public _globalService: GlobalService) {}

  ngOnInit(): void {
    this.getData();
  }
  // tslint:disable-next-line:typedef
  getData() {
    const storage = sessionStorage.getItem('listBooks');
    if (storage !== null) {
      setTimeout(() => {
        this.books = JSON.parse(storage);
      }, 500);
    } else {
    this._globalService.$list(`https://www.googleapis.com/books/v1/volumes?q=all`).subscribe((resp: any) => {
        sessionStorage.setItem('listBooks', JSON.stringify(resp.items));
        this.books = resp.items;
    });
    }
  }
}
