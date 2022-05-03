import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  addFavoriteCourseRequest,
  addFavoriteCourseSuccess,
  addLearningCourseFailure,
  addLearningCourseRequest,
  addLearningCourseSuccess,
  createCourseFailure,
  createCourseRequest,
  createCourseSuccess,
  fetchCoursesFailure,
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchUserCoursesFailure,
  fetchUserCoursesRequest,
  fetchUserCoursesSuccess,
  searchCoursesFailure,
  searchCoursesRequest,
  searchCoursesSuccess,
} from './course.actions';
import { CourseService } from '../../services/course.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

@Injectable()
export class CourseEffects {
  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private courseService: CourseService,
    private router: Router,
    private helpers: HelpersService,
  ) {}

  fetchCourses = createEffect(() => this.actions.pipe(
    ofType(fetchCoursesRequest),
    mergeMap(() => this.courseService.fetchCourses().pipe(
      map(courses => fetchCoursesSuccess({courses})),
      catchError(() => of(fetchCoursesFailure({error: 'Something wrong'})))
    ))
  ));

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
  ));

  searchCourses = createEffect(() => this.actions.pipe(
    ofType(searchCoursesRequest),
    mergeMap(({courseData}) => this.courseService.search(courseData).pipe(
      map(searchCourses => searchCoursesSuccess({searchCourses})),
      this.helpers.catchServerError(searchCoursesFailure)
    ))
  ))

  addLearningCourse = createEffect(() => this.actions.pipe(
    ofType(addLearningCourseRequest),
    mergeMap(({id}) => this.courseService.addLearningCourses(id).pipe(
      map(() => addLearningCourseSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Добавлен в мои курсы');
      }),
      this.helpers.catchServerError(addLearningCourseFailure)
    ))
  ));

  addFavoriteCourse = createEffect(() => this.actions.pipe(
    ofType(addFavoriteCourseRequest),
    mergeMap(({id}) => this.courseService.addFavoriteCourses(id).pipe(
      map(() => addFavoriteCourseSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Добавлен в список желаний');
      }),
      this.helpers.catchServerError(addLearningCourseFailure)
    ))
  ));
}
