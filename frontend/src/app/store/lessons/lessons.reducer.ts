import { createReducer, on } from '@ngrx/store';
import {
  createLessonFailure,
  createLessonRequest,
  createLessonSuccess, deleteLessonFailure, deleteLessonRequest, deleteLessonSuccess,
  fetchLessonFailure,
  fetchLessonRequest,
  fetchLessonSuccess
} from './lessons.actions';
import { LessonsState } from '../types';

const initialState: LessonsState = {
  createLessonLoading: false,
  createLessonError: null,
  fetchLoading: false,
  fetchLoadingError: null,
  lesson: null,
  removeLoading: false,
  removeError: null,
};

export const lessonsReducer = createReducer(
  initialState,
  on(createLessonRequest, state => ({
    ...state,
    createLessonLoading: true
  })),
  on(createLessonSuccess, state => ({
    ...state,
    createLessonLoading: false
  })),
  on(createLessonFailure, (state, {error}) => ({
    ...state,
    createLessonLoading: false,
    createLessonError: error
  })),

  on(fetchLessonRequest, state => ({
    ...state,
    fetchLoading: true,
  })),
  on(fetchLessonSuccess, (state, {lesson}) => ({
    ...state,
    fetchLoading: false,
    lesson
  })),
  on(fetchLessonFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchLoadingError: error
  })),

  on(deleteLessonRequest, state => ({...state, removeLoading: true})),
  on(deleteLessonSuccess, state => ({...state, removeLoading: false})),
  on(deleteLessonFailure, (state, {error}) => ({...state, removeLoading: false, removeError: error})),
);
