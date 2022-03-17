import { AfterViewInit, Component, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Books } from '../../../models/books.model';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit {
  // tslint:disable-next-line:no-input-rename
  @Input() listBooks = [];
  displayedColumns: string[] = ['publicDate', 'title', 'subtitle', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;
  dataSource = new MatTableDataSource<Books>(this.listBooks);
  isLoading = false;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.isLoading = true;
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() { }

  // tslint:disable-next-line:typedef
  getListBooks(): void {
    this.dataSource = new MatTableDataSource<Books>(this.listBooks);
    this.dataSource.paginator = this.paginator;
    // setTimeout(() => {
    this.isLoading = false;
    // }, 1000);
    console.log('getListBooks');
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listBooks !== undefined && changes.listBooks !== null) {
      console.log('Aqui', changes);
      this.getListBooks();
      console.log('ListBooks');
    }
  }
}
