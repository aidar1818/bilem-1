import { createAction, props } from '@ngrx/store';
import { Review } from '../../models/review.model';

export const fetchReviewsRequest = createAction(
  '[Reviews] Fetch Request',
  props<{id: string}>()
  );
export const fetchReviewsSuccess = createAction(
  '[Reviews] Fetch Success',
  props<{reviews: Review[]}>());
export const fetchReviewsFailure = createAction(
  '[Reviews] Fetch Failure',
  props<{error: string}>()
);
