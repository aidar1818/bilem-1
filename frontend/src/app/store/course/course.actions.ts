import { createAction, props } from '@ngrx/store';
import { Course, CourseData } from '../../models/course.model';

export const fetchCoursesRequest = createAction('[Courses] Fetch Request');
export const fetchCoursesSuccess = createAction('[Courses] Fetch Success', props<{courses: Course[]}>());
export const fetchCoursesFailure = createAction('[Courses] Fetch Failure', props<{error: string}>());

export const fetchUserCoursesRequest = createAction(
  '[UserCourses] Fetch Request',
  props<{id: string}>()
);
export const fetchUserCoursesSuccess = createAction(
  '[UserCourses] Fetch Success',
  props<{courses: Course[]}>()
);
export const fetchUserCoursesFailure = createAction(
  '[UserCourses] Fetch Failure',
  props<{error: string}>()
);

export const createCourseRequest = createAction(
  '[Course] Create Request',
  props<{courseData: CourseData}>()
);
export const createCourseSuccess = createAction(
  '[Course] Create Success'
);
export const createCourseFailure = createAction(
  '[Course] Create Failure',
  props<{error: string}>()
);

export const searchCoursesRequest = createAction(
  '[Courses] Search Request',
  props<{courseData: {}}>()
);
export const searchCoursesSuccess = createAction(
  '[Courses] Search Success',
  props<{searchCourses: Course[]}>()
);
export const searchCoursesFailure = createAction(
  '[Courses] Search Failure',
  props<{error: string}>()
);

