import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { addFavoriteCourseRequest, addLearningCourseRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course!: Course;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.course = <Course>data['course'];
    });
  }

  addLearningCourse(id: string) {
    this.store.dispatch(addLearningCourseRequest({id}))
  }

  addFavoriteCourse(id: string) {
    this.store.dispatch(addFavoriteCourseRequest({id}))
  }
}
