import { UsersState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  addSocialNetworksFailure,
  addSocialNetworksRequest, addSocialNetworksSuccess,
  editPasswordFailure,
  editPasswordRequest,
  editPasswordSuccess, editProfileFailure, editProfileRequest, editProfileSuccess,
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
  googleLoading: false,
  editProfileLoading: false,
  editProfileError: null,
  addSocialNetworksLoading: false,
  addSocialNetworksError: null
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
  on(sendEmailSuccess, (state, {user}) => ({...state, loginLoading: false, user})),

  on(sendUserCodeRequest, state => ({...state, loginLoading: true, codeError: null})),
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

  on(fetchUserRequest, state => ({
    ...state, fetchLoading: true
  })),
  on(fetchUserSuccess, (state, {user}) => ({
    ...state, fetchLoading: false, user
  })),
  on(fetchUserFailure, (state, {error}) => ({
    ...state, fetchLoading: false, fetchLoadingError: error
  })),

  on(editProfileRequest, state => ({
    ...state, editProfileLoading: true
  })),
  on(editProfileSuccess, (state, {user}) => ({
    ...state, editProfileLoading: false, user
  })),
  on(editProfileFailure, (state, {error}) => ({
    ...state, editProfileLoading: false, editProfileError: error
  })),

  on(addSocialNetworksRequest, state => ({
    ...state, addSocialNetworksLoading: true
  })),
  on(addSocialNetworksSuccess, (state, {user}) => ({
    ...state, addSocialNetworksLoading: false, user
  })),
  on(addSocialNetworksFailure, (state, {error}) => ({
    ...state, addSocialNetworksLoading: false, addSocialNetworksError: error
  }))
);
