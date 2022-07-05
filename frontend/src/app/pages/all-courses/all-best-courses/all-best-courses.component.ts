import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { fetchAllBestCoursesRequest } from '../../../store/course/course.actions';

@Component({
  selector: 'app-all-best-courses',
  templateUrl: './all-best-courses.component.html',
  styleUrls: ['./all-best-courses.component.css']
})
export class AllBestCoursesComponent implements OnInit {
  courses: Observable<Course[] | null>;
  loading: Observable<boolean | null>;

  constructor(private store: Store<AppState>) {
    this.courses = store.select(state => state.courses.bestCourses);
    this.loading = store.select(state => state.courses.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAllBestCoursesRequest());
  }
}
