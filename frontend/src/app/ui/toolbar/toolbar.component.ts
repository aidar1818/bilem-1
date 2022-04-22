import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users/users.actions';
import { Category } from '../../models/category.model';
import { deleteCategoryRequest, fetchCategoriesRequest } from '../../store/categories/categories.actions';
import { fetchSubcategoriesByCategoryRequest } from '../../store/subcategories/subcategories.actions';
import { Subcategory } from '../../models/subcategory.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  categories: Observable<Category[]>;
  categoriesArray!: Category[];
  categorySubscription!: Subscription;
  subCategories: Observable<Subcategory[]>;
  subCategoriesArray!: Subcategory[];
  subCategorySubscription!: Subscription;
  fetchLoadingCategory: Observable<boolean>;
  fetchLoadingError: Observable<null | string>
  search = '';

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.categories = store.select(state => state.categories.categories);
    this.fetchLoadingCategory = store.select(state => state.categories.fetchLoading);
    this.fetchLoadingError = store.select(state => state.categories.fetchLoadingError);
    this.subCategories = store.select(state => state.subcategories.subcategories);
  }

  ngOnInit() {
    this.store.dispatch(fetchCategoriesRequest());

    this.categorySubscription = this.categories.subscribe(categories => {
      if (categories) {
        this.categoriesArray = categories;
      }
    });
    this.subCategorySubscription = this.subCategories.subscribe(subCategories => {
      if (subCategories) {
        this.subCategoriesArray = subCategories;
      }
    });
  }

  logout(){
    this.store.dispatch(logoutUserRequest());
  }

  deleteCategory(id: string) {
    this.store.dispatch(deleteCategoryRequest({id}))
  }

  fetchSubCategory(id: string) {
    this.store.dispatch(fetchSubcategoriesByCategoryRequest({id}));
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.subCategorySubscription.unsubscribe();
  }
}
