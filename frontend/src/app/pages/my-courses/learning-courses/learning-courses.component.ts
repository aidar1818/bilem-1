import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { User } from '../../../models/user.model';
import { fetchUserRequest } from '../../../store/users/users.actions';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-learning-courses',
  templateUrl: './learning-courses.component.html',
  styleUrls: ['./learning-courses.component.css']
})
export class LearningCoursesComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  learningCourses: Course[] = [];
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.users.fetchLoading);
    this.error = store.select(state => state.users.fetchLoadingError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUserRequest())
    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.learningCourses = user.myCourses;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
