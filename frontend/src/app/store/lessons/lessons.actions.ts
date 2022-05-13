import { createAction, props } from '@ngrx/store';
import { Lesson } from '../../models/course.model';

export const createLessonRequest = createAction(
  '[Lesson] Create Request',
  props<{ lessonData: Lesson }>()
);
export const createLessonSuccess = createAction(
  '[Lesson] Create Success'
);
export const createLessonFailure = createAction(
  '[Lesson] Create Failure',
  props<{ error: string }>()
);

export const fetchLessonRequest = createAction(
  '[Lesson] Fetch Request',
  props<{ lessonId: string }>()
);
export const fetchLessonSuccess = createAction(
  '[Lesson] Fetch Success',
  props<{ lesson: Lesson | null }>()
);
export const fetchLessonFailure = createAction(
  '[Lesson] Fetch Failure',
  props<{ error: string }>()
);

export const deleteLessonRequest = createAction(
  '[Lesson] Delete Request',
  props<{ id: string }>()
);
export const deleteLessonSuccess = createAction(
  '[Lesson] Delete Success'
);
export const deleteLessonFailure = createAction(
  '[Lesson] Delete Failure',
  props<{ error: string }>()
);
