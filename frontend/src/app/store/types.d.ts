import { LoginError, RegisterError, User } from '../models/user.models';
import { Category } from '../models/category.model';

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
  fetchLoadingError: null | string
};

export type AppState = {
  users: UsersState,
  categories: CategoriesState
};
