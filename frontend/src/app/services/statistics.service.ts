import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs';
import { Statistics } from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {}

  getStatistics(userId: string) {
    return this.http.get<Statistics>(env.apiUrl + '/users/statistics/' + userId).pipe(
      map(response => {
        return new Statistics(
          response.courses,
          response.students,
          response.lessons,
          response.comments,
        );
      })
    );
  }
}

