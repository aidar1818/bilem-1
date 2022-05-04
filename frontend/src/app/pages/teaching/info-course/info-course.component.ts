import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
export class InfoCourseComponent implements OnInit {
  courseId!: string;
  course: Observable<Course | null>;
  courseInfo!: Course;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  url = 'http://localhost:8000/uploads/';
  urlImg!: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.course = store.select(state => state.courses.course);
    this.loading = store.select(state => state.courses.fetchLoading);
    this.error = store.select(state => state.courses.fetchLoadingError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    })
    this.store.dispatch(fetchCourseInfoRequest({id: this.courseId}));

    this.course.subscribe(info => {
      if (info) {
        this.courseInfo = info;
        if (info.image) {
          this.urlImg = `${this.url}${info.image}`;
        }
      }
    })
  }

}
