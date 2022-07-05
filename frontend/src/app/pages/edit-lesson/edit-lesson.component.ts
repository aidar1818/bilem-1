import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { createLessonRequest, fetchLessonRequest } from '../../store/lessons/lessons.actions';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Course, Lesson } from '../../models/course.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  course: Observable<Course | null>;
  lesson: Observable<Lesson | null>;
  fetchLessonDataLoading: Observable<boolean>;
  fetchLessonDataError: Observable<string | null>;
  lessonSub!: Subscription;
  lessonId = '';
  htmlContent = '';
  is_free!: boolean | undefined;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: true,
    toolbarPosition: 'bottom',
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.loading = store.select(state => state.lessons.createLessonLoading);
    this.error = store.select(state => state.lessons.createLessonError);
    this.lesson = store.select(state => state.lessons.lesson);
    this.fetchLessonDataLoading = store.select(state => state.lessons.fetchLoading);
    this.fetchLessonDataError = store.select(state => state.lessons.fetchLoadingError);
    this.course = store.select(state => state.courses.course);

    this.course.subscribe(courseData => {
      this.is_free = courseData?.is_free;
    })
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

    if(this.form.value.videoFile) {
      lessonData.video = this.form.value.videoFile;
    }

    this.store.dispatch(createLessonRequest({lessonData}));
  }

  ngOnDestroy() {
    this.lessonSub.unsubscribe();
  }
}
