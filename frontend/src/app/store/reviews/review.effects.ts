import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ReviewsService } from '../../services/reviews.service';
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
import { AppState } from '../types';
import { Store } from '@ngrx/store';

@Injectable()
export class ReviewEffects {
  constructor(
    private actions: Actions,
    private reviewsService: ReviewsService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {
  }

  fetchReviews = createEffect(() => this.actions.pipe(
    ofType(fetchReviewsRequest),
    mergeMap(({ id }) => this.reviewsService.fetchReviews(id).pipe(
      map(reviews => fetchReviewsSuccess({ reviews })),
      this.helpers.catchServerError(fetchReviewsFailure)
    ))
  ));

  createReview = createEffect(() => this.actions.pipe(
    ofType(createReviewRequest),
    mergeMap(({ reviewData }) => this.reviewsService.createReview(reviewData).pipe(
      map(() => createReviewSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Отзыв успешно добавлен');
        this.store.dispatch(fetchReviewsRequest({ id: reviewData.courseId }));
      }),
      catchError(() => of(createReviewFailure({ error: 'Не удалось оставить отзыв!' }))),
    )),
  ));

  removeReview = createEffect(() => this.actions.pipe(
    ofType(removeReviewRequest),
    mergeMap(({ review }) => this.reviewsService.removeReview(review._id).pipe(
      map(() => removeReviewSuccess()),
      tap(() => {
        this.store.dispatch(fetchReviewsRequest({ id: review.course._id }));
        this.helpers.openSnackbar('Отзыв успешно удален!');
      }),
      this.helpers.catchServerError(removeReviewFailure),
    ))
  ));
}
