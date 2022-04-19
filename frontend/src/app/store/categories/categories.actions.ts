import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';

export const fetchCategoriesRequest = createAction(
  '[Categories] Register Request'
);
export const fetchCategoriesSuccess = createAction(
  '[Categories] Register Success',
  props<{categories: Category[]}>()
);
export const fetchCategoriesFailure = createAction(
  '[Categories] Register Failure',
  props<{error: string}>()
);
