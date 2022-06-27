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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  freeCourses: Observable<Course[] | null>;
  freeCoursesData: Course[] = [];
  paidCourses: Observable<Course[] | null>;
  paidCoursesData: Course[] = [];
  freeLoading: Observable<boolean | null>;
  paidLoading: Observable<boolean | null>;
  removeLoading: Observable<boolean>;
  publishLoading: Observable<boolean>;
  addToTheBestLoading: Observable<boolean>;
  removeFromBestLoading: Observable<boolean>;
  toBeDeletedCourse = '';
  toBePublishCourse = '';
  toBeBestCourse = '';
  toBeRemoveBestCourse = '';
  freeCoursesSub!: Subscription;
  paidCoursesSub!: Subscription;

  totalLengthFree: any;
  pageFree: number = 1;
  totalLengthPaid: any;
  pagePaid: number = 1;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.freeCourses = store.select(state => state.courses.allFreeCourses);
    this.paidCourses = store.select(state => state.courses.allPaidCourses);
    this.freeLoading = store.select(state => state.courses.fetchAllFreeCoursesLoading);
    this.paidLoading = store.select(state => state.courses.fetchAllPaidCoursesLoading);
    this.removeLoading = store.select(state => state.courses.removeLoading);
    this.publishLoading = store.select(state => state.courses.publishLoading);
    this.addToTheBestLoading = store.select(state => state.courses.addToTheBestLoading);
    this.removeFromBestLoading = store.select(state => state.courses.removeFromBestLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAllFreeCoursesRequest());
    this.store.dispatch(fetchAllPaidCoursesRequest());
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
    })
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
    window.scrollTo(0, 0);
  }

  onPagePaidChange(page: number) {
    this.pagePaid = page;
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.paidCoursesSub.unsubscribe();
    this.freeCoursesSub.unsubscribe();
  }
}
