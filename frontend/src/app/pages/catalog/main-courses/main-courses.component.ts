import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { Course } from '../../../models/course.model';
import { fetchAllBestCoursesRequest } from '../../../store/course/course.actions';

@Component({
  selector: 'app-main-courses',
  templateUrl: './main-courses.component.html',
  styleUrls: ['./main-courses.component.css']
})
export class MainCoursesComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  courses: Observable<Course[] | null>;
  bestCourses: Observable<Course[] | null>;
  bestCoursesData: Course[] = [];
  bestCoursesSub!: Subscription;
  loadingSub!: Subscription;
  loading!: boolean | null;

  mobile = true;

  learning = false;
  userSub!: Subscription;
  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.courses = store.select(state => state.courses.courses);
    this.bestCourses = store.select(state => state.courses.bestCourses);
  }

  ngOnInit() {
    this.store.dispatch(fetchAllBestCoursesRequest());
    this.loading = true;

    if (window.screen.width <= 537) {
      this.mobile = false;
    }

    this.bestCoursesSub = this.bestCourses.subscribe(c => {
      if (c) {
        this.bestCoursesData = c.slice(0, 6);
      }
    });

    this.userSub = this.user.subscribe(user => {
      if (user) {
        user.myCourses.forEach(course => {
          this.bestCoursesData.forEach(c => {
            if (course.course._id === c._id) {
              this.learning = true;
            }
          })
        });
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
    }, 0)
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.bestCoursesSub.unsubscribe()
  }
}
