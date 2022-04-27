import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCoursesRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  courses: Observable<Course[]>;

  constructor(private store: Store<AppState>) {
    this.courses = store.select(state => state.courses.courses);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCoursesRequest());
  }
}
