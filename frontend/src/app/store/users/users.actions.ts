import { createAction, props } from '@ngrx/store';
import {
  CodeUserData, EditPasswordData,
  EmailData, googleLoginUserData,
  LoginError, LoginFacebookUser,
  LoginUserData,
  RegisterError,
  RegisterUserData,
  User
} from '../../models/user.models';

export const registerUserRequest = createAction(
  '[Users] Register Request',
  props<{userData: RegisterUserData}>()
);
export const registerUserSuccess = createAction(
  '[Users] Register Success',
  props<{user: User}>()
);
export const registerUserFailure = createAction(
  '[Users] Register Failure',
  props<{error: null | RegisterError}>()
);
export const loginUserRequest = createAction(
  '[Users] Login Request',
  props<{userData: LoginUserData}>()
);
export const loginUserSuccess = createAction(
  '[Users] Login Success',
  props<{user: User}>()
);
export const loginUserFailure = createAction(
  '[Users] Login Failure',
  props<{error: null | LoginError}>()
);

export const loginFacebookRequest = createAction(
  '[Users] Login Facebook Request',
  props<{userData: LoginFacebookUser}>()
);

export const loginFacebookSuccess = createAction(
  '[Users] Login Facebook Success',
  props<{user: User}>()
);
export const loginFacebookFailure = createAction(
  '[Users] Login Facebook Failure',
  props<{error: null | LoginError}>()
);

export const logoutUser = createAction('[Users] Logout');
export const logoutUserRequest = createAction('[Users] Server Logout Request');

export const sendEmailRequest = createAction('[User] SendEmail Request', props<{email: EmailData}>());
export const sendEmailSuccess = createAction('[User] SendEmail Success',  props<{user: User}>());

export const sendUserCodeRequest = createAction('[User] SendCode Request', props<{userData: CodeUserData}>());
export const sendUserCodeSuccess = createAction('[User] SendCode Success', props<{code: string}>());
export const sendUserCodeFailure = createAction('[User] SendCode Failure', props<{error: string}>());

export const editPasswordRequest = createAction('[User] EditPassword Request', props<{password: EditPasswordData}>());
export const editPasswordSuccess = createAction('[User] EditPassword Success');
export const editPasswordFailure = createAction('[User] EditPassword Failure', props<{error: string}>());

export const loginGoogleRequest = createAction('[Users] LoginGoogle Request', props<{userData: googleLoginUserData}>());
export const loginGoogleSuccess = createAction('[Users] LoginGoogle Success', props<{user: User}>());
export const loginGoogleFailure = createAction('[Users] LoginGoogle Failure', props<{error: null | LoginError}>());


