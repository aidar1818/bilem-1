import { CourseState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createCourseFailure,
  createCourseRequest,
  createCourseSuccess,
  fetchCourseInfoFailure,
  fetchCourseInfoRequest,
  fetchCourseInfoSuccess,
  fetchCoursesByCategoryFailure,
  fetchCoursesByCategoryRequest,
  fetchCoursesByCategorySuccess, fetchCoursesBySubcategoryFailure,
  fetchCoursesBySubcategoryRequest, fetchCoursesBySubcategorySuccess,
  fetchCoursesFailure,
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchUserCoursesFailure,
  fetchUserCoursesRequest,
  fetchUserCoursesSuccess,
  publishCourseFailure,
  publishCourseRequest,
  publishCourseSuccess,
  removeCourseFailure,
  removeCourseRequest,
  removeCourseSuccess,
  searchCoursesFailure,
  searchCoursesRequest,
  searchCoursesSuccess
} from './course.actions';

const initialState: CourseState = {
  courses: [],
  course: null,
  searchCourses: [],
  fetchLoading: false,
  fetchLoadingError: null,
  fetchPersonalLoading: false,
  fetchPersonalLoadingError: null,
  fetchSortLoading: false,
  fetchSortLoadingError: null,
  fetchBySubcategoryLoading: false,
  fetchBySubcategoryLoadingError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  publishLoading: false,
};

export const courseReducer = createReducer(
  initialState,
  on(fetchCoursesRequest, state => ({...state, fetchLoading: true})),
  on(fetchCoursesSuccess, (state, {courses}) => ({...state, fetchLoading: false, courses})),
  on(fetchCoursesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchLoadingError: error})),

  on(fetchCourseInfoRequest, state => ({...state, fetchLoading: true})),
  on(fetchCourseInfoSuccess, (state, {course}) => ({...state, fetchLoading: false, course})),
  on(fetchCourseInfoFailure, (state, {error}) => ({...state, fetchLoading: false, fetchLoadingError: error})),

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

  on(fetchCoursesByCategoryRequest, state => ({...state, fetchSortLoading: true})),
  on(fetchCoursesByCategorySuccess, (state, {courses}) => ({...state, fetchSortLoading: false, courses})),
  on(fetchCoursesByCategoryFailure, (state, {error}) => ({...state, fetchSortLoading: false, fetchSortLoadingError: error})),

  on(fetchCoursesBySubcategoryRequest, state => ({...state, fetchBySubcategoryLoading: true})),
  on(fetchCoursesBySubcategorySuccess, (state, {courses}) => ({...state, fetchBySubcategoryLoading: false, courses})),
  on(fetchCoursesBySubcategoryFailure, (state, {error}) => ({...state, fetchBySubcategoryLoading: false, fetchBySubcategoryLoadingError: error})),

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
  on(searchCoursesSuccess, (state, {searchCourses}) => ({...state, fetchLoading: false, searchCourses})),
  on(searchCoursesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchLoadingError: error})),

  on(removeCourseRequest, state => ({...state, removeLoading: true})),
  on(removeCourseSuccess, state => ({...state, removeLoading: false})),
  on(removeCourseFailure, state => ({...state, removeLoading: false})),

  on(publishCourseRequest, state => ({...state, publishLoading: true})),
  on(publishCourseSuccess, state => ({...state, publishLoading: false})),
  on(publishCourseFailure, state => ({...state, publishLoading: false})),
);
