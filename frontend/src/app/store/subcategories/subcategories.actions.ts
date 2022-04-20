import { createAction, props } from '@ngrx/store';
import { Subcategory } from '../../models/subcategory.model';

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
