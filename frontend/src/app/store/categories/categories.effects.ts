import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import {
  createCategoryFailure,
  createCategoryRequest,
  createCategorySuccess,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess
} from './categories.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

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
  ));

  createCategory = createEffect(() => this.actions.pipe(
    ofType(createCategoryRequest),
    mergeMap(({categoryData}) => this.categoriesService.createNewCategory(categoryData).pipe(
      map(() => createCategorySuccess()),
      tap(() => {
        this.helpers.openSnackbar('Успешное создание категории!');
        void this.router.navigate(['/']);
      }),
      catchError(() => of(createCategoryFailure({error: 'Неверные данные для создания категории!'})))
    ))
  ));


}
