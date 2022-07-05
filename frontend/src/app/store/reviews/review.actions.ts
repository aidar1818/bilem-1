import { createAction, props } from '@ngrx/store';
import { Review, ReviewData } from '../../models/review.model';

export const fetchReviewsRequest = createAction(
  '[Reviews] Fetch Request',
  props<{ id: string }>()
);
export const fetchReviewsSuccess = createAction(
  '[Reviews] Fetch Success',
  props<{ reviews: Review[] }>());
export const fetchReviewsFailure = createAction(
  '[Reviews] Fetch Failure',
  props<{ error: string }>()
);

export const createReviewRequest = createAction('[Reviews] Create Request', props<{ reviewData: ReviewData }>());
export const createReviewSuccess = createAction('[Reviews] Create Success');
export const createReviewFailure = createAction('[Reviews] Create Failure', props<{ error: string }>());

export const removeReviewRequest = createAction('[Reviews] Remove Request', props<{ review: Review }>());
export const removeReviewSuccess = createAction('[Reviews] Remove Success');
export const removeReviewFailure = createAction('[Reviews] Remove Failure', props<{ error: string }>());
