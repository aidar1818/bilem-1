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

export const fetchCategoryByIdRequest = createAction('[Category] Fetch CategoryBy Request', props<{id: string}>());
export const fetchCategoryByIdSuccess = createAction('[Category] Fetch CategoryBy Success', props<{category: Category}>());
export const fetchCategoryByIdFailure = createAction('[Category] Fetch CategoryBy Failure', props<{error: string}>());

export const createCategoryRequest = createAction('[Category] Create Request',
  props<{ categoryData: CreateCategoryData }>()
);
export const createCategorySuccess = createAction('[Category] Create Success');
export const createCategoryFailure = createAction(
  '[Category] Create Failure',
  props<{ error: string }>()
);

export const editCategoryRequest = createAction('[Category] Edit Request', props<{id: string, change: {title: string}}>());
export const editCategorySuccess = createAction('[Category] Edit Success', props<{category: Category}>());
export const editCategoryFailure = createAction('[Category] Edit Failure', props<{error: string}>());

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

