import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { Course } from '../../../models/course.model';
import { fetchUserCoursesRequest } from '../../../store/course/course.actions';
import { deleteLessonRequest } from '../../../store/lessons/lessons.actions';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  user: Observable<null | User>;
  id: null | string = null;
  courses: Observable<Course[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe(user => {
      this.id = user ? user._id : null;
    });
    this.courses = store.select(state => state.courses.courses);
    this.loading = store.select(state => state.courses.fetchLoading);
    this.error = store.select(state => state.courses.fetchLoadingError);
  }

  ngOnInit(): void {
    if (this.id) {
      this.store.dispatch(fetchUserCoursesRequest({id: this.id}));
    }
  }

  deleteLesson(id: string) {
    this.store.dispatch(deleteLessonRequest({id}));
  }
}
