import { CategoriesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createCategoryFailure,
  createCategoryRequest,
  createCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  editCategoryRequest, editCategorySuccess,
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
  editLoading: false,
  editError: null,
  removeLoading: false,
  removeError: null,
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

  on(editCategoryRequest, state => ({...state, editLoading: true})),
  on(editCategorySuccess, (state, {category}) => ({
    ...state,
    categories: state.categories.map(item => {
      if (item._id === category._id) {
        return category;
      }
      return item;
    })
  })),

  on(deleteCategoryRequest, state => ({...state, removeLoading: true})),
  on(deleteCategorySuccess, state => ({
    ...state,
    removeLoading: false,
  })),
  on(deleteCategoryFailure, (state, {error}) => ({
    ...state,
    removeLoadingLoading: false,
    removeError: error,
  })),
);
