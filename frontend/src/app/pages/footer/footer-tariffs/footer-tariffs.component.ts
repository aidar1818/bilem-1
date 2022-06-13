import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { TariffData } from '../../../models/course.model';

@Component({
  selector: 'app-footer-tariffs',
  templateUrl: './footer-tariffs.component.html',
  styleUrls: ['./footer-tariffs.component.css']
})
export class FooterTariffsComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  data: TariffData = {
    courses: 0,
    users: 0,
    paidCourses: 0
  };

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private courseService: CourseService
  ) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.courseService.fetchTariffData().subscribe(res => {
      if (res) {
        this.data = {
          courses: res.courses.length,
          users: res.users.length,
          paidCourses: res.paidCourses.length
        }
      }
    })
  }

  start() {
    this.userSub = this.user.subscribe(user => {
      if (user) {
        void this.router.navigate(['/teaching/new']);
      } else {
        void this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
