import { LoginError, RegisterError, User } from '../models/user.models';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  loginFacebookLoading: boolean,
  loginFacebookError: null | LoginError
}

export type AppState = {
  users: UsersState,
}
