import { CourseState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createCourseFailure,
  createCourseRequest,
  createCourseSuccess, fetchCoursesFailure, fetchCoursesRequest, fetchCoursesSuccess, fetchUserCoursesFailure,
  fetchUserCoursesRequest, fetchUserCoursesSuccess, searchCoursesFailure, searchCoursesRequest, searchCoursesSuccess
} from './course.actions';

const initialState: CourseState = {
  courses: [],
  fetchLoading: false,
  fetchLoadingError: null,
  fetchPersonalLoading: false,
  fetchPersonalLoadingError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null,
};

export const courseReducer = createReducer(
  initialState,
  on(fetchCoursesRequest, state => ({...state, fetchLoading: true})),
  on(fetchCoursesSuccess, (state, {courses}) => ({...state, fetchLoading: false, courses})),
  on(fetchCoursesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchLoadingError: error})),

  on(fetchUserCoursesRequest, state => ({...state, fetchPersonalLoading: true})),
  on(fetchUserCoursesSuccess, (state, {courses}) => ({
    ...state,
    fetchPersonalLoading: false,
    courses
  })),
  on(fetchUserCoursesFailure, (state, {error}) => ({
    ...state,
    fetchPersonalLoading: false,
    fetchPersonalLoadingError: error
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

  on(searchCoursesRequest, state => ({...state, fetchLoading: true})),
  on(searchCoursesSuccess, (state, {courses}) => ({...state, fetchLoading: false, courses})),
  on(searchCoursesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchLoadingError: error})),
);
