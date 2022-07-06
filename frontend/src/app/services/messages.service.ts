import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Message, MessageData } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<Message[]>(environment.apiUrl + '/messages').pipe(
      map(response => {
        return response.map(placeData => {
          return new Message(
            placeData._id,
            placeData.name,
            placeData.email,
            placeData.phoneNumber,
            placeData.text
          );
        });
      })
    );
  }

  createMessage(messageData: MessageData) {
    return this.http.post(environment.apiUrl + '/messages', messageData);
  }

  deleteMessage(id: string) {
    return this.http.delete(environment.apiUrl + '/messages/' + id)
  }
}
