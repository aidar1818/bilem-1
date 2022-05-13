import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { fetchUserCoursesRequest, removeCourseRequest } from '../../../store/course/course.actions';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  user: Observable<null | User>;
  id: null | string = null;
  courses: Observable<Course[]>
  loading: Observable<boolean>
  error: Observable<null | string>
  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe(user => {
      this.id = user ? user._id : null;
    });
    this.courses = store.select(state => state.courses.courses);
    this.loading = store.select(state => state.courses.fetchPersonalLoading);
    this.error = store.select(state => state.courses.fetchLoadingError);
  }

  ngOnInit(): void {
    if (this.id) {
      this.store.dispatch(fetchUserCoursesRequest({id: this.id}));
    }
  }

  deleteCourse(idCourse: string) {
    this.store.dispatch(removeCourseRequest({id: idCourse}))
  }
}
