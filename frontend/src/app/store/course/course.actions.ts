import { createAction, props } from '@ngrx/store';
import { Course, CourseData } from '../../models/course.model';

export const fetchCoursesRequest = createAction('[Courses] Fetch Request');
export const fetchCoursesSuccess = createAction('[Courses] Fetch Success', props<{courses: Course[]}>());
export const fetchCoursesFailure = createAction('[Courses] Fetch Failure', props<{error: string}>());

export const fetchCourseInfoRequest = createAction(
  '[Course] Fetch Request',
  props<{id: string}>());
export const fetchCourseInfoSuccess = createAction(
  '[Course] Fetch Success',
  props<{course: Course}>());
export const fetchCourseInfoFailure = createAction(
  '[Course] Fetch Failure',
  props<{error: string}>());


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

export const fetchCoursesByCategoryRequest = createAction('[Courses] FetchByCategory Request', props<{id: string}>());
export const fetchCoursesByCategorySuccess = createAction('[Courses] FetchByCategory Success', props<{courses: Course[]}>());
export const fetchCoursesByCategoryFailure = createAction('[Courses] FetchByCategory Failure', props<{error: string}>());

export const fetchCoursesBySubcategoryRequest = createAction('[Courses] FetchBySubcategory Request', props<{id: string}>());
export const fetchCoursesBySubcategorySuccess = createAction('[Courses] FetchBySubcategory Success', props<{courses: Course[]}>());
export const fetchCoursesBySubcategoryFailure = createAction('[Courses] FetchBySubcategory Failure', props<{error: string}>());

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

export const addLearningCourseRequest = createAction(
  '[Users] Add Learning Course Request',
  props<{id: string}>()
);
export const addLearningCourseSuccess = createAction(
  '[Users] Add Learning Course Success',
);
export const addLearningCourseFailure = createAction(
  '[Users] Add Learning Course Failure',
  props<{error: string}>()
);

export const addFavoriteCourseRequest = createAction(
  '[Users] Add Favorite Course Request',
  props<{id: string}>()
);
export const addFavoriteCourseSuccess = createAction(
  '[Users] Add Favorite Course Success',
);
export const addFavoriteCourseFailure = createAction(
  '[Users] Add Favorite Course Failure',
  props<{error: string}>()
);

export const removeCourseRequest = createAction('[Course] Remove Request', props<{ id: string }>());
export const removeCourseSuccess = createAction('[Course] Remove Success');
export const removeCourseFailure = createAction('[Course] Remove Failure');

export const publishCourseRequest = createAction('[Course] Publish Request', props<{ id: string }>());
export const publishCourseSuccess = createAction('[Course] Publish Success');
export const publishCourseFailure = createAction('[Course] Publish Failure');
