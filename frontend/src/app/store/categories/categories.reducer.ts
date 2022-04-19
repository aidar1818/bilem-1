import { CategoriesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createCategoryFailure,
  createCategoryRequest, createCategorySuccess,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess
} from './categories.actions';

const initialState: CategoriesState = {
  categories: [],
  fetchLoading: false,
  fetchLoadingError: null,
  createLoading: false,
  createError: null,
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
  on(createCategoryRequest, state => ({...state, createLoading: true})),
  on(createCategorySuccess, state => ({...state, createLoading: false})),
  on(createCategoryFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error
  })),
);
