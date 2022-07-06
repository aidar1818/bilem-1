import { createReducer, on } from '@ngrx/store';
import { MessagesState } from '../types';
import {
  createMessageFailure,
  createMessageRequest,
  createMessageSuccess,
  deleteMessageFailure,
  deleteMessageRequest,
  deleteMessageSuccess,
  fetchMessagesFailure,
  fetchMessagesRequest,
  fetchMessagesSuccess
} from './messages.actions';

const initialState: MessagesState = {
  messages: [],
  fetchLoading: false,
  fetchLoadingError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null,
};

export const messagesReducer = createReducer(
  initialState,
  on(fetchMessagesRequest, state => ({...state, fetchLoading: true})),
  on(fetchMessagesSuccess, (state, {messages}) => ({
    ...state,
    fetchLoading: false,
    messages
  })),
  on(fetchMessagesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createMessageRequest, state => ({...state, createLoading: true})),
  on(createMessageSuccess, state => ({...state, createLoading: false})),
  on(createMessageFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
  on(deleteMessageRequest, state => ({...state, removeLoading: true})),
  on(deleteMessageSuccess, state => ({...state, removeLoading: false})),
  on(deleteMessageFailure, (state, {error}) => ({
    ...state,
    removeLoading: false,
    removeError: error,
  })),
);
