import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { HelpersService } from '../../services/helpers.service';
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
import { MessagesService } from '../../services/messages.service';

@Injectable()
export class MessagesEffects {
  fetchMessages = createEffect(() => this.actions.pipe(
    ofType(fetchMessagesRequest),
    mergeMap(() => this.messagesService.getMessages().pipe(
      map(messages => fetchMessagesSuccess({messages})),
      catchError(() => of(fetchMessagesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createMessage = createEffect(() => this.actions.pipe(
    ofType(createMessageRequest),
    mergeMap(({messageData}) => this.messagesService.createMessage(messageData).pipe(
      map(() => createMessageSuccess()),
      tap(() => {
        this.store.dispatch(fetchMessagesRequest());
        this.helpers.openSnackbar('Успешно добавлен!');
      }),
      catchError(() => of(createMessageFailure({error: 'Wrong data'})))
    ))
  ));

  deleteMessage = createEffect(() => this.actions.pipe(
    ofType(deleteMessageRequest),
    mergeMap(({id}) => this.messagesService.deleteMessage(id).pipe(
      map(() => deleteMessageSuccess()),
      tap(() => {
        this.store.dispatch(fetchMessagesRequest());
        this.helpers.openSnackbar('Успешно удален!');
      }),
      catchError(() => of(deleteMessageFailure({error: 'No access!'})))
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private helpers: HelpersService,
    private messagesService: MessagesService,
  ) {}
}
