import { LoginError, RegisterError, User } from '../models/user.models';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';
import { Course } from '../models/course.model';
import { Module } from '../models/module.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  loginFacebookLoading: boolean,
  loginFacebookError: null | LoginError,
  code: string | null,
  codeError: string | null,
  userEmail: string | null
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
  removeLoading: boolean,
  removeError: null | string,
};

export type CourseState = {
  courses: Course[],
  fetchLoading: boolean,
  fetchLoadingError: null | string,
  createLoading: boolean,
  createError: null | string,
  removeLoading: boolean,
  removeError: null | string,
};

export type ModuleState = {
  modules: Module[],
  fetchLoading: boolean,
  fetchLoadingError: null | string,
  createLoading: boolean,
  createError: null | string,
  removeLoading: boolean,
  removeError: null | string,
}

export type AppState = {
  users: UsersState,
  categories: CategoriesState,
  subcategories: SubcategoriesState,
  courses: CourseState,
  modules: ModuleState
};
