import { SubcategoriesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createSubcategoryFailure,
  createSubcategoryRequest,
  createSubcategorySuccess,
  deleteSubcategoryFailure,
  deleteSubcategoryRequest,
  deleteSubcategorySuccess,
  editSubcategoryRequest,
  editSubcategorySuccess,
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
  editLoading: false,
  editError: null,
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

  on(createSubcategoryRequest, state => ({...state, createLoading: true})),
  on(createSubcategorySuccess, state => ({...state, createLoading: false})),
  on(createSubcategoryFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error
  })),

  on(editSubcategoryRequest, state => ({...state, editLoading: true})),
  on(editSubcategorySuccess, (state, {subcategory}) => ({
    ...state,
    subcategories: state.subcategories.map(item => {
      if (item._id === subcategory._id) {
        return subcategory;
      }
      return item;
    })
  })),

  on(deleteSubcategoryRequest, state => ({...state, removeLoading: true})),
  on(deleteSubcategorySuccess, state => ({
    ...state,
    removeLoading: false,
  })),
  on(deleteSubcategoryFailure, (state, {error}) => ({
    ...state,
    removeLoadingLoading: false,
    removeError: error,
  })),
);
