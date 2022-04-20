import { CourseState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { createCourseFailure, createCourseRequest, createCourseSuccess } from './course.actions';

const initialState: CourseState = {
  courses: [],
  fetchLoading: false,
  fetchLoadingError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null,
};

export const courseReducer = createReducer(
  initialState,
  on(createCourseRequest, state => ({
    ...state,
    createLoading: true,
    createError: null
  })),
  on(createCourseSuccess, state => ({
    ...state,
    createLoading: false
  })),
  on(createCourseFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error
  })),
);
