import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { map, mergeMap } from 'rxjs';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from './categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService,
    private router: Router,
    private helpers: HelpersService
  ) {}

  fetchCategories = createEffect(() => this.actions.pipe(
    ofType(fetchCategoriesRequest),
    mergeMap(() => this.categoriesService.getCategories().pipe(
      map(categories => fetchCategoriesSuccess({categories})),
      this.helpers.catchServerError(fetchCategoriesFailure)
    ))
  ))
}
