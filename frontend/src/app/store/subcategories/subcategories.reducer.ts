import { SubcategoriesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  fetchSubcategoriesByCategoryFailure,
  fetchSubcategoriesByCategoryRequest,
  fetchSubcategoriesByCategorySuccess
} from './subcategories.actions';

const initialState: SubcategoriesState = {
  subcategories: [],
  fetchLoading: false,
  fetchLoadingError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null,
};

export const subcategoriesReducer = createReducer(
  initialState,
  on(fetchSubcategoriesByCategoryRequest, state => ({
    ...state,
    fetchLoading: true,
    fetchLoadingError: null
  })),
  on(fetchSubcategoriesByCategorySuccess, (state, {subcategories}) => ({
    ...state,
    fetchLoading: false,
    subcategories
  })),
  on(fetchSubcategoriesByCategoryFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchLoadingError: error
  })),
);
