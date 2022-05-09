import { createAction, props } from '@ngrx/store';
import { CreateSubcategoryData, Subcategory } from '../../models/subcategory.model';

export const fetchSubcategoriesByCategoryRequest = createAction(
  '[Subcategories] Fetch Request',
  props<{id: string}>()
);
export const fetchSubcategoriesByCategorySuccess = createAction(
  '[Subcategories] Fetch Success',
  props<{subcategories: Subcategory[]}>()
);
export const fetchSubcategoriesByCategoryFailure = createAction(
  '[Subcategories] Fetch Failure',
  props<{error: string}>()
);

export const fetchSubcategoryByIdRequest = createAction('[Subcategory] FetchById Request', props<{id: string}>());
export const fetchSubcategoryByIdSuccess = createAction('[Subcategory] FetchById Success', props<{subcategory: Subcategory}>());
export const fetchSubcategoryByIdFailure = createAction('[Subcategory] FetchById Failure', props<{error: string}>());

export const createSubcategoryRequest = createAction('[Subcategory] Create Request',
  props<{ subcategoryData: CreateSubcategoryData }>()
);
export const createSubcategorySuccess = createAction('[Subcategory] Create Success');
export const createSubcategoryFailure = createAction(
  '[Subcategory] Create Failure',
  props<{ error: string }>()
);

export const editSubcategoryRequest = createAction('[Subcategory] Edit Request', props<{id: string, change: {title: string}}>());
export const editSubcategorySuccess = createAction('[Subcategory] Edit Success', props<{subcategory: Subcategory}>());
export const editSubcategoryFailure = createAction('[Subcategory] Edit Failure', props<{error: string}>());

export const deleteSubcategoryRequest = createAction(
  '[Subcategory] Delete Request',
  props<{id: string}>()
);
export const deleteSubcategorySuccess = createAction(
  '[Subcategory] Delete Success'
);
export const deleteSubcategoryFailure = createAction(
  '[Subcategory] Delete Failure',
  props<{error: string}>()
);
