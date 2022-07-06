import { createAction, props } from '@ngrx/store';
import { Message, MessageData } from '../../models/message.model';

export const fetchMessagesRequest = createAction('[Messages] Fetch Request');
export const fetchMessagesSuccess = createAction(
  '[Messages] Fetch Success',
  props<{messages: Message[]}>()
);
export const fetchMessagesFailure = createAction(
  '[Messages] Fetch Failure',
  props<{error: string}>()
);

export const createMessageRequest = createAction(
  '[Messages] Create Request',
  props<{messageData: MessageData}>()
);
export const createMessageSuccess = createAction(
  '[Messages] Create Success'
);
export const createMessageFailure = createAction(
  '[Messages] Create Failure',
  props<{error: string}>()
);

export const deleteMessageRequest = createAction(
  '[Messages] Delete Request',
  props<{id: string}>()
);
export const deleteMessageSuccess = createAction(
  '[Messages] Delete Success'
);
export const deleteMessageFailure = createAction(
  '[Messages] Delete Failure',
  props<{error: string}>()
);
