import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { fetchUserRequest } from '../../../store/users/users.actions';
import { removeFavoriteCourseRequest, startCourseRequest } from '../../../store/course/course.actions';

@Component({
  selector: 'app-favorite-courses',
  templateUrl: './favorite-courses.component.html',
  styleUrls: ['./favorite-courses.component.css']
})
export class FavoriteCoursesComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  favoriteCourses: Course[] = [];
  loading: Observable<boolean>;
  removeLoading: Observable<boolean>;
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.users.fetchLoading);
    this.removeLoading = store.select(state => state.courses.removeFavoriteCourse);
    this.error = store.select(state => state.users.fetchLoadingError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUserRequest())
    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.favoriteCourses = user.favoriteCourses;
      }
    });
  }

  removeCourse(event: Event, id: string) {
    event.preventDefault();
    this.store.dispatch(removeFavoriteCourseRequest({ id }));
  }

  startCourse(event: Event, id: string) {
    event.preventDefault();
    this.store.dispatch(startCourseRequest({ id }));
  }

  onDeleteClick(event: Event) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onMenuClick(event: Event) {
    event.preventDefault();
  }
}
