import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  createSubcategoryRequest,
  createSubcategorySuccess,
  deleteSubcategoryFailure,
  deleteSubcategoryRequest,
  deleteSubcategorySuccess,
  editSubcategoryRequest,
  editSubcategorySuccess,
  fetchSubcategoriesByCategoryFailure,
  fetchSubcategoriesByCategoryRequest,
  fetchSubcategoriesByCategorySuccess
} from './subcategories.actions';
import { SubcategoriesService } from '../../services/subcategories.service';
import { createCategoryFailure } from '../categories/categories.actions';
import { AppState } from '../types';
import { Store } from '@ngrx/store';

@Injectable()
export class SubcategoriesEffects {
  constructor(
    private actions: Actions,
    private subcategoriesService: SubcategoriesService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
  ) {}

  fetchSubcategories = createEffect(() => this.actions.pipe(
    ofType(fetchSubcategoriesByCategoryRequest),
    mergeMap(({id}) => this.subcategoriesService.getSubcategories(id).pipe(
      map(subcategories => fetchSubcategoriesByCategorySuccess({subcategories})),
      this.helpers.catchServerError(fetchSubcategoriesByCategoryFailure)
    ))
  ));

  createSubcategory = createEffect(() => this.actions.pipe(
    ofType(createSubcategoryRequest),
    mergeMap(({subcategoryData}) => this.subcategoriesService.createSubcategory(subcategoryData).pipe(

      map(() => createSubcategorySuccess()),
      tap(() => {
        this.helpers.openSnackbar('Успешное создание подкатегории!');
        void this.router.navigate(['/']);
      }),
      catchError(() => of(createCategoryFailure({error: 'Неверные данные для создания подкатегории!'})))
    ))
  ));

  editSubcategory = createEffect(() => this.actions.pipe(
    ofType(editSubcategoryRequest),
    mergeMap(({id, change}) => this.subcategoriesService.editSubcategory(id, change).pipe(
      map(subcategory => editSubcategorySuccess({subcategory}))
    ))
  ));

  deleteSubcategory = createEffect(() => this.actions.pipe(
    ofType(deleteSubcategoryRequest),
    mergeMap(({id}) => this.subcategoriesService.deleteSubcategory(id).pipe(
      map(() => deleteSubcategorySuccess()),
      tap(() => {
        this.store.dispatch(fetchSubcategoriesByCategoryRequest({id}));
        this.helpers.openSnackbar('Успешное удаление подкатегории!');
      }),
      this.helpers.catchServerError(deleteSubcategoryFailure)
    ))
  ));

}
