import { AfterViewInit, Component, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Books } from '../../../models/books.model';
import { ModalListComponent } from '../modal-list/modal-list.component';
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
  dataSource = new MatTableDataSource<Books>(this.listBooks);
  isLoading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;
  // tslint:disable-next-line:no-output-rename
  @Output('refreshData') cambioValor: EventEmitter<boolean> = new EventEmitter ();

  constructor(public dialog: MatDialog) {}

  openDialog(datos: any, isShowMethod: boolean = false): void {
    this.dialog.open(ModalListComponent, {
      width: '900px',
      data: { book: datos, isShow: isShowMethod }
    });
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.isLoading = true;
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    //
  }

  // tslint:disable-next-line:typedef
  getListBooks(): void {
    this.dataSource = new MatTableDataSource<Books>(this.listBooks);
    this.dataSource.paginator = this.paginator;
    this.isLoading = false;
  }

  getListStorageBooks(): void {
    const storage = JSON.parse(sessionStorage.getItem('listBooks'));
    this.dataSource = new MatTableDataSource<Books>(storage);
    this.dataSource.paginator = this.paginator;
    this.isLoading = false;
  }

  // tslint:disable-next-line:typedef
  deleteItem(item: any) {
    this.isLoading = true;
    const storage = JSON.parse(sessionStorage.getItem('listBooks'));
    const index = storage.findIndex(el => {
      return el.id === item.id;
    });
    storage.splice(index, 1);
    this.updateStorage(storage);
  }
  // tslint:disable-next-line:typedef
  updateStorage(storage: any) {
    if (storage.length > 0) {
    sessionStorage.setItem('listBooks', JSON.stringify(storage));
    setTimeout(() => {
      this.getListStorageBooks();
    }, 300);
    } else {
      sessionStorage.clear();
      this.cambioValor.emit(true);
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listBooks !== undefined && changes.listBooks !== null) {
      this.getListBooks();
    }
  }
}
