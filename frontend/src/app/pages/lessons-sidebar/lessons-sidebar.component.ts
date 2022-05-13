import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Course, Module } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCourseInfoRequest } from '../../store/course/course.actions';


@Component({
  selector: 'app-lessons-sidebar',
  templateUrl: './lessons-sidebar.component.html',
  styleUrls: ['./lessons-sidebar.component.css']
})
export class LessonsSidebarComponent implements OnInit, OnDestroy {
  courseId!: string;
  course: Observable<Course | null>;
  courseInfo!: Course;
  sub!: Subscription;
  modules: Module[] = [];
  lessonId: string = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.course = store.select(state => state.courses.course);
  }

  ngOnInit(): void {
    this.lessonId = '';
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
    });

    this.route.firstChild!.params.subscribe(params => {
      this.lessonId = params['lessonId'];
    });

    this.store.dispatch(fetchCourseInfoRequest({id: this.courseId}));

    this.sub = this.course.subscribe(info => {
      if (info) {
        this.courseInfo = info;
        this.modules = [];

        for (let i = 0; i < info.modules.length; i++) {
          this.modules.push({
            title: info.modules[i].title,
            _id: info.modules[i]._id,
            lessons: info.modules[i].lessons
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
