import { createReducer, on } from '@ngrx/store';
import {
  createLessonFailure,
  createLessonRequest,
  createLessonSuccess,
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
);
