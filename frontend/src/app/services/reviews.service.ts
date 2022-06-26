import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs';
import { Review, ReviewData } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http: HttpClient) {
  }

  fetchReviews(id: string) {
    return this.http.get<Review[]>(env.apiUrl + '/reviews/course/' + id).pipe(
      map(response => {
        return response.map(reviewData => {
          return new Review(
            reviewData._id,
            reviewData.user,
            reviewData.course,
            reviewData.text,
            reviewData.rate,
            reviewData.datetime,
          );
        });
      })
    );
  }

  createReview(reviewData: ReviewData) {
    return this.http.post<Review>(`${ env.apiUrl }/reviews/${ reviewData.courseId }`, reviewData);
  }

  removeReview(id: string) {
    return this.http.delete(env.apiUrl + '/reviews/' + id);
  }
}
