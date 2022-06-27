import { createAction, props } from '@ngrx/store';
import { CommentData, Course, CourseData } from '../../models/course.model';

export const fetchCoursesRequest = createAction('[Courses] Fetch Request');
export const fetchCoursesSuccess = createAction('[Courses] Fetch Success', props<{courses: Course[]}>());
export const fetchCoursesFailure = createAction('[Courses] Fetch Failure', props<{error: string}>());

export const fetchAllFreeCoursesRequest = createAction('[Courses] Fetch All Free Request');
export const fetchAllFreeCoursesSuccess = createAction('[Courses] Fetch All Free Success', props<{allFreeCourses: Course[]}>());
export const fetchAllFreeCoursesFailure = createAction('[Courses] Fetch All Free Failure', props<{error: string}>());

export const fetchAllPaidCoursesRequest = createAction('[Courses] Fetch All Paid Request');
export const fetchAllPaidCoursesSuccess = createAction('[Courses] Fetch All Paid Success', props<{allPaidCourses: Course[]}>());
export const fetchAllPaidCoursesFailure = createAction('[Courses] Fetch All Paid Failure', props<{error: string}>());

export const fetchCourseInfoRequest = createAction(
  '[Course] Fetch Request',
  props<{id: string}>());
export const fetchCourseInfoSuccess = createAction(
  '[Course] Fetch Success',
  props<{course: Course | null}>());
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

export const fetchCoursesByCategoryRequest = createAction('[Courses] Fetch ByCategory Request', props<{id: string}>());
export const fetchCoursesByCategorySuccess = createAction('[Courses] Fetch ByCategory Success', props<{courses: Course[]}>());
export const fetchCoursesByCategoryFailure = createAction('[Courses] Fetch ByCategory Failure', props<{error: string}>());

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

export const addToTheBestRequest = createAction('[Course] AddToTheBest Request', props<{ id: string }>());
export const addToTheBestSuccess = createAction('[Course] AddToTheBest Success');
export const addToTheBestFailure = createAction('[Course] AddToTheBest Failure');

export const removeFromBestRequest = createAction('[Course] RemoveFrom Request', props<{ id: string }>());
export const removeFromBestSuccess = createAction('[Course] RemoveFrom Success');
export const removeFromBestFailure = createAction('[Course] RemoveFrom Failure');

export const createCommentRequest = createAction('[Comment] Create Request', props<{commentData: CommentData}>());
export const createCommentSuccess = createAction('[Comment] Create Success');
export const createCommentFailure = createAction('[Comment] Create Failure', props<{error: string}>());
