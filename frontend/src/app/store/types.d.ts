import { LoginError, RegisterError, User } from '../models/user.models';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';
import { Course, Lesson } from '../models/course.model';
import { Module } from '../models/module.model';

export type UsersState = {
  user: null | User,
  fetchLoading: boolean,
  fetchLoadingError: null | string,
  addLoading: boolean,
  addError: null | string,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  loginFacebookLoading: boolean,
  loginFacebookError: null | LoginError,
  code: string | null,
  codeError: string | null,
  userEmail: string | null,
  googleLoading: boolean,
};

export type CategoriesState = {
  categories: Category[],
  fetchLoading: boolean,
  fetchLoadingError: null | string,
  createLoading: boolean,
  createError: null | string,
  editLoading: boolean,
  editError: null | string,
  removeLoading: boolean,
  removeError: null | string,
};

export type SubcategoriesState = {
  subcategories: Subcategory[],
  fetchLoading: boolean,
  fetchLoadingError: null | string,
  createLoading: boolean,
  createError: null | string,
  editLoading: boolean,
  editError: null | string,
  removeLoading: boolean,
  removeError: null | string,
};

export type CourseState = {
  courses: Course[],
  course: Course | null,
  searchCourses: Course[],
  fetchLoading: boolean,
  fetchLoadingError: null | string,
  fetchPersonalLoading: boolean,
  fetchPersonalLoadingError: null | string,
  createLoading: boolean,
  createError: null | string,
  removeLoading: boolean,
  publishLoading: boolean,
};

export type ModuleState = {
  modules: Module[],
  fetchLoading: boolean,
  fetchLoadingError: null | string,
  createLoading: boolean,
  createError: null | string,
  removeLoading: boolean,
  removeError: null | string,
};

export type LessonsState = {
  createLessonLoading: boolean,
  createLessonError: null | string,
  fetchLoading: boolean,
  fetchLoadingError: null | string,
  lesson: Lesson | null,
};

export type AppState = {
  users: UsersState,
  categories: CategoriesState,
  subcategories: SubcategoriesState,
  courses: CourseState,
  modules: ModuleState,
  lessons: LessonsState
};
