import { createReducer, on } from '@ngrx/store';
import { ReviewsState } from '../types';
import { fetchReviewsFailure, fetchReviewsRequest, fetchReviewsSuccess } from './review.actions';

const initialState: ReviewsState = {
  reviews: [],
  fetchLoading: false,
  fetchLoadingError: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(fetchReviewsRequest, state => ({
    ...state,
    fetchLoading: true,
  })),
  on(fetchReviewsSuccess, (state, {reviews}) => ({
    ...state,
    fetchLoading: false,
    reviews
  })),
  on(fetchReviewsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchLoadingError: error
  })),
);
