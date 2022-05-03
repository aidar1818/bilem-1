import { UsersState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  editPasswordFailure,
  editPasswordRequest,
  editPasswordSuccess,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  loginFacebookFailure,
  loginFacebookRequest,
  loginFacebookSuccess,
  loginGoogleFailure,
  loginGoogleRequest,
  loginGoogleSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  sendEmailRequest,
  sendEmailSuccess,
  sendUserCodeFailure,
  sendUserCodeRequest,
  sendUserCodeSuccess
} from './users.actions';
import {
  addFavoriteCourseFailure,
  addFavoriteCourseRequest,
  addFavoriteCourseSuccess,
  addLearningCourseFailure,
  addLearningCourseRequest,
  addLearningCourseSuccess
} from '../course/course.actions';

const initialState: UsersState = {
  user: null,
  fetchLoading: false,
  fetchLoadingError: null,
  addLoading: false,
  addError: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  loginFacebookLoading: false,
  loginFacebookError: null,
  code: null,
  codeError: null,
  userEmail: null,
  googleLoading: false
};

export const usersReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({
    ...state,
    registerLoading: true,
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
  on(editPasswordFailure, state => ({...state, loginLoading: false})),

  on(loginGoogleRequest, state => ({...state, googleLoading: true, loginError: null})),
  on(loginGoogleSuccess, (state, {user}) => ({...state, googleLoading: false, user})),
  on(loginGoogleFailure, (state, {error}) => ({...state, googleLoading: false, loginError: error})),

  on(addLearningCourseRequest, state => ({
    ...state,
    addLoading: true,
    addError: null
  })),
  on(addLearningCourseSuccess, state => ({
    ...state,
    addLoading: false
  })),
  on(addLearningCourseFailure, (state, {error}) => ({
    ...state,
    addLoading: false,
    addError: error
  })),

  on(addFavoriteCourseRequest, state => ({
    ...state,
    addLoading: true,
    addError: null
  })),
  on(addFavoriteCourseSuccess, state => ({
    ...state,
    addLoading: false
  })),
  on(addFavoriteCourseFailure, (state, {error}) => ({
    ...state,
    addLoading: false,
    addError: error
  })),

  on(fetchUserRequest, state => ({...state, fetchLoading: true})),
  on(fetchUserSuccess, (state, {user}) => ({...state, fetchLoading: false, user})),
  on(fetchUserFailure, (state, {error}) => ({...state, fetchLoading: false, fetchLoadingError: error})),
);
