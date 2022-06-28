import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-main-courses',
  templateUrl: './main-courses.component.html',
  styleUrls: ['./main-courses.component.css']
})
export class MainCoursesComponent implements OnInit {
  user: Observable<null | User>;
  courses: Observable<Course[] | null>;
  loadingSub!: Subscription;
  loading!: boolean | null;

  mobile = true;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.courses = store.select(state => state.courses.courses);
  }

  ngOnInit() {
    this.loading = true;

    if (window.screen.width <= 537) {
      this.mobile = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
    }, 0)
  }
}
