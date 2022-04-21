import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { NgForm } from '@angular/forms';
import { Category, CreateCategoryData } from '../../../models/category.model';
import { createCategoryRequest, editCategoryRequest } from '../../../store/categories/categories.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | string>;
  loading: Observable<boolean>;
  isEdit = false;
  editedId = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loading = store.select(state => state.categories.createLoading);
    this.error = store.select(state => state.categories.createError);
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const category = <Category | null>data['category'];

      if (category) {
        this.isEdit = true;
        this.editedId = category._id;
        this.setFormValue({
          title: category.title,
        });
      } else {
        this.isEdit = false;
        this.editedId = '';
        this.setFormValue({
          title: '',
        });
      }
    });
  }

  setFormValue(value: {[key: string] : any}) {
    setTimeout(() => {
      this.form.form.setValue(value);
    })
  }

  createCategory() {
    const id = this.editedId;
    const categoryData: CreateCategoryData = this.form.value;

    if (this.isEdit) {
      this.store.dispatch(editCategoryRequest({id, change: {title: categoryData.title}}));
    } else {
      this.store.dispatch(createCategoryRequest({categoryData}));
    }
  }
}
