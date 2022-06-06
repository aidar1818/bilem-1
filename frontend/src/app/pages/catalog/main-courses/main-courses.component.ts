import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { Course } from '../../../models/course.model';
import { BreakPoint } from '@angular/flex-layout';

@Component({
  selector: 'app-main-courses',
  templateUrl: './main-courses.component.html',
  styleUrls: ['./main-courses.component.css']
})
export class MainCoursesComponent implements OnInit, OnDestroy, AfterViewInit {
  user: Observable<null | User>;
  courses: Observable<Course[] | null>;
  loadingObservable: Observable<boolean | null>;
  loadingSub!: Subscription;
  loading = false;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.courses = store.select(state => state.courses.courses);
    this.loadingObservable = store.select(state => state.courses.fetchLoading);
  }

  ngOnInit() {
    this.loadingSub = this.loadingObservable.subscribe(course => {
      if(course) {
        this.loading = true;
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
    }, 0)
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
