import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { fetchCoursesRequest } from '../../../store/course/course.actions';

@Component({
  selector: 'app-main-courses',
  templateUrl: './main-courses.component.html',
  styleUrls: ['./main-courses.component.css']
})
export class MainCoursesComponent implements OnInit {
  courses: Observable<Course[]>;
  coursesArray!: Course[];

  constructor(private store: Store<AppState>) {
    this.courses = store.select(state => state.courses.courses);
  }

  ngOnInit(): void {
    this.courses.subscribe(courses => {
      this.coursesArray = courses;
    });

    this.store.dispatch(fetchCoursesRequest());
  }


}
