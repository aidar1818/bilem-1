import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { fetchCoursesRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  courses: Observable<Course[] | null>;
  loading: Observable<boolean | null>;

  constructor(private store: Store<AppState>) {
    this.courses = store.select(state => state.courses.courses);
    this.loading = store.select(state => state.courses.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCoursesRequest());
  }
}
