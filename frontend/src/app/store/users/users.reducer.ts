import { UsersState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  editPasswordFailure,
  editPasswordRequest, editPasswordSuccess,
  loginFacebookFailure,
  loginFacebookRequest, loginFacebookSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess, logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess, sendEmailRequest, sendEmailSuccess, sendUserCodeFailure, sendUserCodeRequest, sendUserCodeSuccess
} from './users.actions';

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  loginFacebookLoading: false,
  loginFacebookError: null,
  code: null,
  codeError: null,
  userEmail: null
};

export const usersReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({
    ...state,
    registerLoading: true,
    registerError: null
  })),
  on(registerUserSuccess, (state, {user}) => ({
    ...state,
    registerLoading: false,
    user
  })),
  on(registerUserFailure, (state, {error}) => ({
    ...state,
    registerLoading: false,
    registerError: error
  })),
  on(loginUserRequest, state => ({
    ...state,
    loginLoading: true,
    loginError: null,
  })),
  on(loginUserSuccess, (state, {user}) => ({
    ...state,
    loginLoading: false,
    user
  })),
  on(loginUserFailure, (state, {error}) => ({
    ...state,
    loginLoading: false,
    loginError: error
  })),

  on(loginFacebookRequest, state => ({...state, loginFacebookLoading: true, loginFacebookError: null,})),
  on(loginFacebookSuccess, (state, {user}) => ({...state, loginFacebookLoading: false, user})),
  on(loginFacebookFailure, (state, {error}) => ({...state, loginFacebookLoading: false, loginFacebookError: error})),

  on(logoutUser, state => ({
    ...state,
    user: null,
  })),

  on(sendEmailRequest, state => ({...state, loginLoading: true})),
  on(sendEmailSuccess, (state, {user}) => ({...state, loginLoading: false, userEmail: user.email})),

  on(sendUserCodeRequest, state => ({...state, loginLoading: true})),
  on(sendUserCodeSuccess, (state, {code}) => ({...state, loginLoading: false, code: code})),
  on(sendUserCodeFailure, (state, {error}) => ({...state, loginLoading: false, codeError: error})),

  on(editPasswordRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(editPasswordSuccess, state => ({...state, loginLoading: false})),
  on(editPasswordFailure, state => ({...state, loginLoading: false}))
)
