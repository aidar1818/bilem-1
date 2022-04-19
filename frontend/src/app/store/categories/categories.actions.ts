import { createAction, props } from '@ngrx/store';
import { CreateCategoryData } from '../../models/category.model';
import { Category } from '../../models/category.model';


export const createCategoryRequest = createAction('[Category] Create Request',
  props<{ categoryData: CreateCategoryData }>()
);
export const createCategorySuccess = createAction('[Category] Create Success');
export const createCategoryFailure = createAction(
  '[Category] Create Failure',
  props<{ error: string }>()
);

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
