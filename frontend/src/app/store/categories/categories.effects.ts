import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  createCategoryFailure,
  createCategoryRequest, createCategorySuccess, deleteCategoryFailure, deleteCategoryRequest, deleteCategorySuccess,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess
} from './categories.actions';
import { AppState } from '../types';
import { Store } from '@ngrx/store';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
  ) {}

  fetchCategories = createEffect(() => this.actions.pipe(
    ofType(fetchCategoriesRequest),
    mergeMap(() => this.categoriesService.getCategories().pipe(
      map(categories => fetchCategoriesSuccess({categories})),
      this.helpers.catchServerError(fetchCategoriesFailure)
    ))
  ))

  createCategory = createEffect(() => this.actions.pipe(
    ofType(createCategoryRequest),
    mergeMap(({categoryData}) => this.categoriesService.createNewCategory(categoryData).pipe(
      map(() => createCategorySuccess()),
      tap(() => {
        this.store.dispatch(fetchCategoriesRequest());
        this.helpers.openSnackbar('Успешное создание категории!');
        void this.router.navigate(['/']);
      }),
      catchError(() => of(createCategoryFailure({error: 'Неверные данные для создания категории!'})))
    ))
  ));

  deleteCategory = createEffect(() => this.actions.pipe(
    ofType(deleteCategoryRequest),
    mergeMap(({id}) => this.categoriesService.deleteCategory(id).pipe(
      map(() => deleteCategorySuccess()),
      tap(() => {
        this.store.dispatch(fetchCategoriesRequest());
        this.helpers.openSnackbar('Успешное удаление категории!');
      }),
      this.helpers.catchServerError(deleteCategoryFailure)
    ))
  ));


}
