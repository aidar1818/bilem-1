import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HelpersService } from '../../services/helpers.service';
import { map, mergeMap } from 'rxjs';
import { ReviewsService } from '../../services/reviews.service';
import { fetchReviewsFailure, fetchReviewsRequest, fetchReviewsSuccess } from './review.actions';

@Injectable()
export class ReviewEffects {
  constructor(
    private actions: Actions,
    private reviewsService: ReviewsService,
    private helpers: HelpersService,
  ) {}

  fetchReviews = createEffect(() => this.actions.pipe(
    ofType(fetchReviewsRequest),
    mergeMap(({id}) => this.reviewsService.fetchReviews(id).pipe(
      map(reviews => fetchReviewsSuccess({reviews})),
      this.helpers.catchServerError(fetchReviewsFailure)
    ))
  ));
}
