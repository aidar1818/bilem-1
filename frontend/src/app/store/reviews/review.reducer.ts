import { createReducer, on } from '@ngrx/store';
import { ReviewsState } from '../types';
import {
  createReviewFailure,
  createReviewRequest,
  createReviewSuccess,
  fetchReviewsFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess,
  removeReviewFailure,
  removeReviewRequest,
  removeReviewSuccess
} from './review.actions';

const initialState: ReviewsState = {
  reviews: [],
  fetchLoading: false,
  fetchLoadingError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(fetchReviewsRequest, state => ({
    ...state,
    fetchLoading: true,
  })),
  on(fetchReviewsSuccess, (state, { reviews }) => ({
    ...state,
    fetchLoading: false,
    reviews
  })),
  on(fetchReviewsFailure, (state, { error }) => ({
    ...state,
    fetchLoading: false,
    fetchLoadingError: error
  })),
  on(createReviewRequest, state => ({ ...state, createLoading: true, createError: null })),
  on(createReviewSuccess, state => ({ ...state, createLoading: false })),
  on(createReviewFailure, (state, { error }) => ({ ...state, createLoading: false, createError: error })),
  on(removeReviewRequest, state => ({ ...state, removeLoading: true, removeError: null })),
  on(removeReviewSuccess, state => ({ ...state, removeLoading: false })),
  on(removeReviewFailure, (state, { error }) => ({ ...state, removeLoading: false, removeError: error })),
);
