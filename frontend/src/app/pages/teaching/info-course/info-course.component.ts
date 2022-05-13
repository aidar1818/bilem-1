import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { fetchCourseInfoRequest } from '../../../store/course/course.actions';

@Component({
  selector: 'app-info-course',
  templateUrl: './info-course.component.html',
  styleUrls: ['./info-course.component.css']
})
export class InfoCourseComponent implements OnInit, OnDestroy{
  course: Observable<Course | null>;
  courseInfo!: Course | null;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  url = 'http://localhost:8000/uploads/';
  urlImg!: string;
  courseSub!: Subscription;
  text = false;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.course = store.select(state => state.courses.course);
    this.loading = store.select(state => state.courses.fetchLoading);
    this.error = store.select(state => state.courses.fetchLoadingError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let courseId = params['id'];
      this.store.dispatch(fetchCourseInfoRequest({id: courseId}));
    });
    this.courseSub = this.course.subscribe(info => {
      if (info) {
        this.text = false;
        this.courseInfo = info;
        if (info.image) {
          this.urlImg = `${this.url}${info.image}`;
        }
      } else {
        this.text = true;
      }
    })
  }

  ngOnDestroy() {
    this.courseSub.unsubscribe();
  }
}
