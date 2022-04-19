import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users/users.actions';
import { Category } from '../../models/category.model';
import { deleteCategoryRequest, fetchCategoriesRequest } from '../../store/categories/categories.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: Observable<null | User>;
  categories: Observable<Category[]>;
  categoriesArray!: Category[];
  categorySubscription!: Subscription;
  fetchLoadingCategory: Observable<boolean>;
  fetchLoadingError: Observable<null | string>
  search = '';

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.categories = store.select(state => state.categories.categories);
    this.fetchLoadingCategory = store.select(state => state.categories.fetchLoading);
    this.fetchLoadingError = store.select(state => state.categories.fetchLoadingError)
  }

  ngOnInit() {
    this.store.dispatch(fetchCategoriesRequest());
    this.categorySubscription = this.categories.subscribe(categories => {
      if (categories) {
        this.categoriesArray = categories;
      }
    })
  }

  logout(){
    this.store.dispatch(logoutUserRequest());
  }

  deleteCategory(id: string) {
    this.store.dispatch(deleteCategoryRequest({id}))
  }
}
