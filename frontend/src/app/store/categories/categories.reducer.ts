import { CategoriesState } from '../types';
import { createReducer } from '@ngrx/store';

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesReducer = createReducer(
  initialState,

);
