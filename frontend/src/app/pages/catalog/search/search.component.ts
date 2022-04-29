import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchCourses: Observable<Course[]>
  loading: Observable<boolean>
  error: Observable<null | string>
  constructor(private store: Store<AppState>) {
    this.searchCourses = store.select(state => state.courses.searchCourses);
    this.loading = store.select(state => state.courses.fetchLoading);
    this.error = store.select(state => state.courses.fetchLoadingError);
  }

  ngOnInit(): void {

  }
}
