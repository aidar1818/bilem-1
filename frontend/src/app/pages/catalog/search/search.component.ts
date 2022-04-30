import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { searchCoursesRequest } from '../../../store/course/course.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchCourses: Observable<Course[]>;
  querySub!: Subscription;
  loading: Observable<boolean>
  error: Observable<null | string>
  available = false;
  courseSub!: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.searchCourses = store.select(state => state.courses.searchCourses);
    this.loading = store.select(state => state.courses.fetchLoading);
    this.error = store.select(state => state.courses.fetchLoadingError);
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParams
      .subscribe(params => {
        const title = params['title']?.toLowerCase();
        this.store.dispatch(searchCoursesRequest(
          {courseData: {title, is_free: params['is_free']}}));
        }
      );

    this.courseSub = this.searchCourses.subscribe(c => {
      if (c.length === 0) {
        this.available = true;
      }
      if (c.length > 0) {
        this.available = false;
      }
    })
  }

  ngOnDestroy() {
    this.available = false;
    this.courseSub.unsubscribe();
    this.querySub.unsubscribe();
  }

}
