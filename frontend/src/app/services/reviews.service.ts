import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http: HttpClient) { }

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
}
