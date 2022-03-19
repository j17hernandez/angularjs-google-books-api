import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalListComponent } from './modal-list.component';

describe('ModalListComponent', () => {
  let component: ModalListComponent;
  let fixture: ComponentFixture<ModalListComponent>;
  const dataBook = {
      isShow: false,
      book: {
        id: '2jujhd339d',
        volumeInfo: {
          title: 'Book of test',
          subtitle: 'The best book',
          authors: ['Jorge', 'Hernandez'],
          categories: ['Web'],
          imageLinks: { thumbnail: 'http://books.google.com/books/content?id=xQZMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }
        }
      }
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalListComponent],
      providers: [{ provide: MatDialog, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: dataBook }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
