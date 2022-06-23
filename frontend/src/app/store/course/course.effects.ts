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
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,
  createCourseFailure,
  createCourseRequest,
  createCourseSuccess,
  fetchCourseInfoFailure,
  fetchCourseInfoRequest,
  fetchCourseInfoSuccess,
  fetchCoursesByCategoryFailure,
  fetchCoursesByCategoryRequest,
  fetchCoursesByCategorySuccess,
  fetchCoursesBySubcategoryFailure,
  fetchCoursesBySubcategoryRequest,
  fetchCoursesBySubcategorySuccess,
  fetchCoursesFailure,
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchUserCoursesFailure,
  fetchUserCoursesRequest,
  fetchUserCoursesSuccess,
  publishCourseFailure,
  publishCourseRequest,
  publishCourseSuccess,
  removeCourseFailure,
  removeCourseRequest,
  removeCourseSuccess,
  removeFavoriteCourseFailure,
  removeFavoriteCourseRequest,
  removeFavoriteCourseSuccess, removeLearningCourseFailure,
  removeLearningCourseRequest, removeLearningCourseSuccess,
  searchCoursesFailure,
  searchCoursesRequest,
  searchCoursesSuccess, startCourseFailure, startCourseRequest, startCourseSuccess,
} from './course.actions';
import { CourseService } from '../../services/course.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { fetchLessonRequest } from '../lessons/lessons.actions';
import {fetchUserRequest} from "../users/users.actions";

@Injectable()
export class CourseEffects {
  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private courseService: CourseService,
    private router: Router,
    private helpers: HelpersService,
  ) {
  }

  fetchCourses = createEffect(() => this.actions.pipe(
    ofType(fetchCoursesRequest),
    mergeMap(() => this.courseService.fetchCourses().pipe(
      map(courses => fetchCoursesSuccess({courses})),
      catchError(() => of(fetchCoursesFailure({error: 'Something wrong'})))
    ))
  ));

  fetchCourseInfo = createEffect(() => this.actions.pipe(
    ofType(fetchCourseInfoRequest),
    mergeMap(({id}) => this.courseService.getCourseById(id).pipe(
      map(course => fetchCourseInfoSuccess({course})),
      catchError(() => of(fetchCourseInfoFailure({error: 'Something wrong'})))
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

  fetchCoursesByCategory = createEffect(() => this.actions.pipe(
    ofType(fetchCoursesByCategoryRequest),
    mergeMap(({id}) => this.courseService.getCoursesByCategory(id).pipe(
      map(courses => fetchCoursesByCategorySuccess({courses})),
      catchError(() => of(fetchCoursesByCategoryFailure({
        error: 'Something wrong'
      })))
    ))
  ));

  fetchCoursesBySubcategory = createEffect(() => this.actions.pipe(
    ofType(fetchCoursesBySubcategoryRequest),
    mergeMap(({id}) => this.courseService.getCoursesBySubcategory(id).pipe(
      map(courses => fetchCoursesBySubcategorySuccess({courses})),
      catchError(() => of(fetchCoursesBySubcategoryFailure({
        error: 'Something wrong'
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

  startCourse = createEffect(() => this.actions.pipe(
    ofType(startCourseRequest),
    mergeMap(({id}) => this.courseService.startCourse(id).pipe(
      map(() => startCourseSuccess()),
      tap(() => {
        this.store.dispatch(fetchUserRequest());
        this.helpers.openSnackbar('Вы успешно поступили на курс');
      }),
      this.helpers.catchServerError(startCourseFailure)
    ))
  ));

  removeCourse = createEffect(() => this.actions.pipe(
    ofType(removeCourseRequest),
    mergeMap(({id}) => this.courseService.removeCourse(id).pipe(
      map(() => removeCourseSuccess()),
      tap(() => {
        this.store.dispatch(fetchCoursesRequest());
        this.helpers.openSnackbar('Успешно удалено');
      }),
      catchError(() => {
        this.helpers.openSnackbar('Курс не удален');
        return of(removeCourseFailure());
      })
    ))
  ));

  removeLearningCourse = createEffect(() => this.actions.pipe(
    ofType(removeLearningCourseRequest),
    mergeMap(({id}) => this.courseService.removeLearningCourse(id).pipe(
      map(() => removeLearningCourseSuccess()),
      tap(() => {
        this.store.dispatch(fetchUserRequest());
        this.helpers.openSnackbar('Вы успешно покинули курс')
      }),
      catchError(() => {
        this.helpers.openSnackbar('Не удалось покинуть курс');
        return of(removeLearningCourseFailure());
      })
    ))
  ));

  removeFavoriteCourse = createEffect(() => this.actions.pipe(
    ofType(removeFavoriteCourseRequest),
    mergeMap(({id}) => this.courseService.removeFavoriteCourse(id).pipe(
      map(() => removeFavoriteCourseSuccess()),
      tap(() => {
        this.store.dispatch(fetchUserRequest());
        this.helpers.openSnackbar('Курс успешно удален из желаемых');
      }),
      catchError(() => {
        this.helpers.openSnackbar('Не удалось удалить курс из желаемых');
        return of(removeFavoriteCourseFailure());
      })
    ))
  ));

  publishCourse = createEffect(() => this.actions.pipe(
    ofType(publishCourseRequest),
    mergeMap(({id}) => this.courseService.publishCourse(id).pipe(
      map(() => publishCourseSuccess()),
      tap(() => {
        this.store.dispatch(fetchCoursesRequest());
        this.helpers.openSnackbar('Успешно опубликовано');
      }),
      catchError(() => {
        this.helpers.openSnackbar('Курс не опубликован');
        return of(publishCourseFailure());
      })
    ))
  ));

  addComment = createEffect(() => this.actions.pipe(
    ofType(createCommentRequest),
    mergeMap(({commentData}) => this.courseService.addComment(commentData).pipe(
      map(() => createCommentSuccess()),
      tap(() => {
        this.store.dispatch(fetchLessonRequest({lessonId: commentData.lessonId}));
        this.helpers.openSnackbar('Комментарий добавлен!');
      }),
      catchError((error) => {
        this.helpers.openSnackbar('Что то пошло не так');
        return of(createCommentFailure({error}));
      }),
    )),
  ));
}
