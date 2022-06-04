import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CourseService } from '../../services/course.service';
import {
  createLessonFailure,
  createLessonRequest,
  createLessonSuccess,
  deleteLessonFailure,
  deleteLessonRequest,
  deleteLessonSuccess,
  fetchLessonFailure,
  fetchLessonRequest,
  fetchLessonSuccess
} from './lessons.actions';
import { fetchUserCoursesRequest } from '../course/course.actions';
import { AppState } from '../types';
import { Store } from '@ngrx/store';

@Injectable()
export class LessonsEffects {
  constructor(
    private actions: Actions,
    private courseService: CourseService,
    private helpers: HelpersService,
    private store: Store<AppState>,
  ) {}

  addLesson = createEffect(() => this.actions.pipe(
    ofType(createLessonRequest),
    mergeMap(({lessonData}) => this.courseService.addLesson(lessonData).pipe(
      map(() => createLessonSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Данные урока успешно сохранены!');
      }),
      catchError(() => of(createLessonFailure({error: 'Неверные данные для изменения урока!'})))
    ))
  ));

  getLesson = createEffect(() => this.actions.pipe(
    ofType(fetchLessonRequest),
    mergeMap(({lessonId, action}) => this.courseService.getLessonData(lessonId, action).pipe(
      map(lesson => fetchLessonSuccess({lesson})),
      catchError(() => of(fetchLessonFailure({error: 'Невозможно загрузить данные урока!'})))
    ))
  ));

  deleteLesson = createEffect(() => this.actions.pipe(
    ofType(deleteLessonRequest),
    mergeMap(({id}) => this.courseService.removeLesson(id).pipe(
      map(() => deleteLessonSuccess()),
      tap(() => {
        let userId : string = '';
        let user = this.store.select(state => state.users.user);
        user.subscribe(user => {
          userId = user ? user._id : '';
        });
        this.store.dispatch(fetchUserCoursesRequest({id: userId}));
        this.helpers.openSnackbar('Урок успешно удален!');
      }),
      this.helpers.catchServerError(deleteLessonFailure)
    ))
  ));

}
