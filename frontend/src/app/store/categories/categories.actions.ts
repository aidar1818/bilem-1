import { createAction, props } from '@ngrx/store';
import { CreateCategoryData } from '../../models/category.model';
import { Category } from '../../models/category.model';

export const fetchCategoriesRequest = createAction(
  '[Categories] Fetch Request'
);
export const fetchCategoriesSuccess = createAction(
  '[Categories] Fetch Success',
  props<{categories: Category[]}>()
);
export const fetchCategoriesFailure = createAction(
  '[Categories] Fetch Failure',
  props<{error: string}>()
);

export const createCategoryRequest = createAction('[Category] Create Request',
  props<{ categoryData: CreateCategoryData }>()
);
export const createCategorySuccess = createAction('[Category] Create Success');
export const createCategoryFailure = createAction(
  '[Category] Create Failure',
  props<{ error: string }>()
);

export const deleteCategoryRequest = createAction(
  '[Categories] Delete Request',
  props<{id: string}>()
);
export const deleteCategorySuccess = createAction(
  '[Categories] Delete Success'
);
export const deleteCategoryFailure = createAction(
  '[Categories] Delete Failure',
  props<{error: string}>()
);
