import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  createCategoryFailure,
  createCategoryRequest,
  createCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess, editCategoryFailure,
  editCategoryRequest, editCategorySuccess,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess, fetchCategoryByIdFailure, fetchCategoryByIdRequest, fetchCategoryByIdSuccess
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

  fetchCategoryById = createEffect(() => this.actions.pipe(
    ofType(fetchCategoryByIdRequest),
    mergeMap(({id}) => this.categoriesService.fetchCategoryById(id).pipe(
      map(category => fetchCategoryByIdSuccess({category})),
      catchError(() => of(fetchCategoryByIdFailure({error: 'Something wrong'})))
    ))
  ));

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

  editCategory = createEffect(() => this.actions.pipe(
    ofType(editCategoryRequest),
    mergeMap(({id, change}) => this.categoriesService.editCategory(id, change).pipe(
      map(category => editCategorySuccess({category})),
      tap(() => {
        this.helpers.openSnackbar('Название категории изменено!');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(editCategoryFailure)
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
