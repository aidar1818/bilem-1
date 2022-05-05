import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CourseService } from '../../services/course.service';
import {
  createLessonFailure,
  createLessonRequest,
  createLessonSuccess,
  fetchLessonFailure,
  fetchLessonRequest,
  fetchLessonSuccess
} from './lessons.actions';

@Injectable()
export class LessonsEffects {
  constructor(
    private actions: Actions,
    private courseService: CourseService,
    private helpers: HelpersService,
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
    mergeMap(({lessonId}) => this.courseService.getLessonData(lessonId).pipe(
      map(lesson => fetchLessonSuccess({lesson})),
      catchError(() => of(fetchLessonFailure({error: 'Невозможно загрузить данные урока!'})))
    ))
  ));
}
