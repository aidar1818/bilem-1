import { CourseState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createCourseFailure,
  createCourseRequest,
  createCourseSuccess, fetchUserCoursesFailure,
  fetchUserCoursesRequest, fetchUserCoursesSuccess
} from './course.actions';

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
  on(fetchUserCoursesRequest, state => ({...state, fetchLoading: true})),
  on(fetchUserCoursesSuccess, (state, {courses}) => ({
    ...state,
    fetchLoading: false,
    courses
  })),
  on(fetchUserCoursesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchLoadingError: error
  })),
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
