import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  createCourseFailure,
  createCourseRequest,
  createCourseSuccess, fetchUserCoursesFailure, fetchUserCoursesRequest, fetchUserCoursesSuccess,
} from './course.actions';
import { CourseService } from '../../services/course.service';

@Injectable()
export class CourseEffects {
  constructor(
    private actions: Actions,
    private courseService: CourseService,
    private router: Router,
    private helpers: HelpersService,
  ) {}

  fetchUserCourses = createEffect(() => this.actions.pipe(
    ofType(fetchUserCoursesRequest),
    mergeMap(({id}) => this.courseService.getUserCourses(id).pipe(
      map(courses => fetchUserCoursesSuccess({courses})),
      catchError(() => of(fetchUserCoursesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createCourse = createEffect(() => this.actions.pipe(
    ofType(createCourseRequest),
    mergeMap(({courseData}) => this.courseService.createCourse(courseData).pipe(
      map(() => createCourseSuccess()),
      tap(() => {
        void this.router.navigate(['/teaching/courses']);
        this.helpers.openSnackbar('Создан новый курс');
      }),
      this.helpers.catchServerError(createCourseFailure)
    ))
  ))
}
