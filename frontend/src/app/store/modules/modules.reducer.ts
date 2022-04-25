import { CourseState, ModuleState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { createModuleFailure, createModuleRequest, createModuleSuccess } from './modules.actions';

const initialState: ModuleState = {
  modules: [],
  fetchLoading: false,
  fetchLoadingError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null,
};

export const modulesReducer = createReducer(
  initialState,
  on(createModuleRequest, state => ({
    ...state,
    createLoading: true,
    createError: null
  })),
  on(createModuleSuccess, state => ({
    ...state,
    createLoading: false
  })),
  on(createModuleFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error
  })),
);
