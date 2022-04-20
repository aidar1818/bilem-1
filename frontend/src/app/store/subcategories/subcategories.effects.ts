import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { map, mergeMap } from 'rxjs';
import {
  fetchSubcategoriesByCategoryFailure,
  fetchSubcategoriesByCategoryRequest,
  fetchSubcategoriesByCategorySuccess
} from './subcategories.actions';
import { SubcategoriesService } from '../../services/subcategories.service';

@Injectable()
export class SubcategoriesEffects {
  constructor(
    private actions: Actions,
    private subcategoriesService: SubcategoriesService,
    private router: Router,
    private helpers: HelpersService,
  ) {}

  fetchSubcategories = createEffect(() => this.actions.pipe(
    ofType(fetchSubcategoriesByCategoryRequest),
    mergeMap(({id}) => this.subcategoriesService.getSubcategories(id).pipe(
      map(subcategories => fetchSubcategoriesByCategorySuccess({subcategories})),
      this.helpers.catchServerError(fetchSubcategoriesByCategoryFailure)
    ))
  ))
}
