import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { createLessonRequest, fetchLessonRequest } from '../../store/lessons/lessons.actions';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Lesson } from '../../models/course.model';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  lesson: Observable<Lesson | null>;
  fetchLessonDataLoading: Observable<boolean>;
  fetchLessonDataError: Observable<string | null>;
  lessonSub!: Subscription;
  lessonId = '';

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.loading = store.select(state => state.lessons.createLessonLoading);
    this.error = store.select(state => state.lessons.createLessonError);
    this.lesson = store.select(state => state.lessons.lesson);
    this.fetchLessonDataLoading = store.select(state => state.lessons.fetchLoading);
    this.fetchLessonDataError = store.select(state => state.lessons.fetchLoadingError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.lessonId = params['lessonId'];

      this.store.dispatch(fetchLessonRequest({lessonId: this.lessonId}));

      this.lessonSub = this.lesson.subscribe(lesson => {
        if (lesson) {
          this.setFormValue({
            title: lesson?.title,
            description: lesson?.description,
            video: lesson?.video
          });
        }
      });
    });
  }

  setFormValue(value: { [key: string]: any }) {
    setTimeout(() => {
      this.form.form.patchValue(value);
    })
  }

  editLesson() {
    const lessonData: Lesson = {
      _id: this.lessonId,
      title: this.form.value.title,
      description: this.form.value.description,
      video: this.form.value.video,
      comments: [],
    };
    this.store.dispatch(createLessonRequest({lessonData}));
  }

  ngOnDestroy() {
    this.lessonSub.unsubscribe();
  }
}
