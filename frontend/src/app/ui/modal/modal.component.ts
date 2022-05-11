import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { deleteCategoryRequest } from '../../store/categories/categories.actions';
import { deleteSubcategoryRequest } from '../../store/subcategories/subcategories.actions';
import { removeCourseRequest } from '../../store/course/course.actions';

export interface DialogData {
  id: string;
  title: string;
  type?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(id: string, type: string) {
    switch (type) {
      case 'Категория':
        this.store.dispatch(deleteCategoryRequest({id}))
        this.dialogRef.close();
        break;
      case "Подкатегория":
        this.store.dispatch(deleteSubcategoryRequest({id}))
        this.dialogRef.close();
        break;
      case "Курс":
        this.store.dispatch(removeCourseRequest({id}));
        this.dialogRef.close();
        break;
      default:
        this.dialogRef.close();
        break;
    }
  }
}
