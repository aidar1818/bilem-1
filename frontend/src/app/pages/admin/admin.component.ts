import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import {
  addToTheBestRequest,
  fetchAllFreeCoursesRequest,
  fetchAllPaidCoursesRequest, publishCourseRequest,
  removeCourseRequest, removeFromBestRequest
} from '../../store/course/course.actions';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../ui/modal/modal.component';
import { Message } from '../../models/message.model';
import { deleteMessageRequest, fetchMessagesRequest } from '../../store/messages/messages.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  freeCourses: Observable<Course[] | null>;
  freeCoursesData: Course[] = [];
  messages: Observable<Message[] | null>;
  messagesData: Message[] = [];
  paidCourses: Observable<Course[] | null>;
  paidCoursesData: Course[] = [];
  freeLoading: Observable<boolean | null>;
  messagesLoading: Observable<boolean | null>;
  paidLoading: Observable<boolean | null>;
  removeLoading: Observable<boolean>;
  publishLoading: Observable<boolean>;
  addToTheBestLoading: Observable<boolean>;
  removeFromBestLoading: Observable<boolean>;
  removeMesLoading: Observable<boolean>;
  toBeDeletedCourse = '';
  toBePublishCourse = '';
  toBeBestCourse = '';
  toBeRemoveBestCourse = '';
  toBeRemoveMessage = '';
  freeCoursesSub!: Subscription;
  paidCoursesSub!: Subscription;
  messagesSub!: Subscription;

  totalLengthFree: any;
  pageFree: number = 1;
  totalLengthPaid: any;
  pagePaid: number = 1;
  totalLengthMes: any;
  pageMes: number = 1;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.freeCourses = store.select(state => state.courses.allFreeCourses);
    this.messages = store.select(state => state.messages.messages);
    this.paidCourses = store.select(state => state.courses.allPaidCourses);
    this.freeLoading = store.select(state => state.courses.fetchAllFreeCoursesLoading);
    this.paidLoading = store.select(state => state.courses.fetchAllPaidCoursesLoading);
    this.messagesLoading = store.select(state => state.courses.fetchAllPaidCoursesLoading);
    this.removeLoading = store.select(state => state.courses.removeLoading);
    this.publishLoading = store.select(state => state.courses.publishLoading);
    this.addToTheBestLoading = store.select(state => state.courses.addToTheBestLoading);
    this.removeFromBestLoading = store.select(state => state.courses.removeFromBestLoading);
    this.removeMesLoading = store.select(state => state.courses.removeFromBestLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAllFreeCoursesRequest());
    this.store.dispatch(fetchAllPaidCoursesRequest());
    this.store.dispatch(fetchMessagesRequest());
    this.freeCoursesSub = this.freeCourses.subscribe(c => {
      if (c) {
        this.freeCoursesData = c;
        this.totalLengthFree = this.freeCoursesData.length;

      }
    });
    this.paidCoursesSub = this.paidCourses.subscribe(c => {
      if (c) {
        this.paidCoursesData = c;
        this.totalLengthPaid = this.paidCoursesData.length;

      }
    });

    this.messagesSub = this.messages.subscribe(mes => {
      if (mes) {
        this.messagesData = mes;
        this.totalLengthMes = this.messagesData.length;

      }
    });
  }

  openDialogCourseDelete(event: Event, id: string, title: string): void {
    event.stopPropagation();
    this.toBeDeletedCourse = id;
    this.dialog.open(ModalComponent, {
      data: {title: `курс "${title}"`, id, type: 'Курс'},
    });
  }

  removeCourse(id: string, event: Event) {
    event.stopPropagation();
    this.toBeDeletedCourse = id;
    this.store.dispatch(removeCourseRequest({id}));
  }

  removeMessages(id: string, event: Event) {
    event.stopPropagation();
    this.toBeRemoveMessage = id;
    this.store.dispatch(deleteMessageRequest({id}));
  }

  publishCourse(id: string, event: Event) {
    event.stopPropagation();
    this.toBePublishCourse = id;
    this.store.dispatch(publishCourseRequest({id}));
  }

  addToTheBestCourse(id: string, event: Event) {
    event.stopPropagation();
    this.toBeBestCourse = id;
    this.store.dispatch(addToTheBestRequest({id}));
  }

  removeFromBestCourse(id: string, event: Event) {
    event.stopPropagation();
    this.toBeRemoveBestCourse = id;
    this.store.dispatch(removeFromBestRequest({id}));
  }

  onPageFreeChange(page: number) {
    this.pageFree = page;
  }

  onPagePaidChange(page: number) {
    this.pagePaid = page;
  }

  onPageMesChange(page: number) {
    this.pageMes = page;
  }

  ngOnDestroy(): void {
    this.paidCoursesSub.unsubscribe();
    this.freeCoursesSub.unsubscribe();
    this.messagesSub.unsubscribe();
  }
}
