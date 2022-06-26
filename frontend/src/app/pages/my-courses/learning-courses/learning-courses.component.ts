import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { MyCourses, User } from '../../../models/user.model';
import { fetchUserRequest } from '../../../store/users/users.actions';
import { Router } from '@angular/router';
import { removeLearningCourseRequest } from "../../../store/course/course.actions";

@Component({
  selector: 'app-learning-courses',
  templateUrl: './learning-courses.component.html',
  styleUrls: ['./learning-courses.component.css']
})
export class LearningCoursesComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  userData!: User;

  learningCourses: MyCourses[] = [];
  lastCourses: MyCourses[] = [];
  loading: Observable<boolean>;
  removeLoading: Observable<boolean>;
  error: Observable<null | string>;

  totalLength: any;
  page: number = 1;

  constructor(private store: Store<AppState>, private router: Router) {
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.users.fetchLoading);
    this.removeLoading = store.select(state => state.courses.removeLearningCourse);
    this.error = store.select(state => state.users.fetchLoadingError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUserRequest());
    this.userSub = this.user.subscribe(user => {
      if (user) {
        const coursesCopy = [...user.myCourses];
        const courses = coursesCopy.sort((a: MyCourses, b: MyCourses) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        this.lastCourses = courses.slice(0, 4);
        this.learningCourses = courses;

        this.totalLength = courses.length;
      }
    });
  }

  getCourseTitle(courseTitle: string) {
    if (courseTitle.length > 30) {
      return courseTitle.substring(0, 30) + '...';
    } else {
      return courseTitle;
    }
  }

  onPageChange(page: number) {
    this.page = page;
    window.scrollTo(0, 0);
  }

  redirectOnFavoriteCourses() {
    void this.router.navigate(['favorite']);
  }

  removeCourse(id: string) {
    this.store.dispatch(removeLearningCourseRequest({id}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
