import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { Course } from '../../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { fetchUserRequest } from '../../../store/users/users.actions';

@Component({
  selector: 'app-favorite-courses',
  templateUrl: './favorite-courses.component.html',
  styleUrls: ['./favorite-courses.component.css']
})
export class FavoriteCoursesComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  favoriteCourses: Course[] = [];
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
        this.favoriteCourses = user.favoriteCourses;
      }
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
