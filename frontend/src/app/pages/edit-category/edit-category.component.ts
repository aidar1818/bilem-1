import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { CreateCategoryData } from '../../models/category.model';
import { createCategoryRequest } from '../../store/categories/categories.actions';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | string>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.categories.createLoading);
    this.error = store.select(state => state.categories.createError);
  }

  ngOnInit(): void {
  }

  createCategory() {
    const categoryData: CreateCategoryData = this.form.value;
    this.store.dispatch(createCategoryRequest({categoryData}));
  }
}
