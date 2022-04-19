import { CategoriesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from './categories.actions';

const initialState: CategoriesState = {
  categories: [],
  fetchLoading: false,
  fetchLoadingError: null
};

export const categoriesReducer = createReducer(
  initialState,
  on(fetchCategoriesRequest, state => ({
    ...state,
    fetchLoading: true,
    fetchLoadingError: null
  })),
  on(fetchCategoriesSuccess, (state, {categories}) => ({
    ...state,
    fetchLoading: false,
    categories
  })),
  on(fetchCategoriesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchLoadingError: error
  })),
);
