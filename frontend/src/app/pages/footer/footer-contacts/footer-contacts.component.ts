import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { MessageData } from '../../../models/message.model';
import { createMessageRequest } from '../../../store/messages/messages.actions';

@Component({
  selector: 'app-footer-contacts',
  templateUrl: './footer-contacts.component.html',
  styleUrls: ['./footer-contacts.component.css']
})
export class FooterContactsComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.messages.createLoading);
    this.error = store.select(state => state.messages.createError);
  }
  ngOnInit(): void {
  }

  onSubmit() {
    const messageData: MessageData = this.form.value;
    this.store.dispatch(createMessageRequest({messageData}));
    this.form.resetForm()
  }
}
