import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchLessonRequest } from '../../store/lessons/lessons.actions';
import { Observable, Subscription } from 'rxjs';
import { Lesson } from '../../models/course.model';
import { NgForm } from '@angular/forms';
import { createCommentRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  lesson: Observable<Lesson | null>;
  lessonSub!: Subscription;
  lessonData!: Lesson;
  textDescription = '';

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
    this.lesson = store.select(state => state.lessons.lesson);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['lessonId']) {
        this.store.dispatch(fetchLessonRequest({lessonId: params['lessonId']}));
      }
    });

    this.lessonSub = this.lesson.subscribe(lessonData => {
      if (lessonData) {
        this.lessonData = lessonData;

        let parser = new DOMParser(),
          doc = parser.parseFromString(this.lessonData.description!, 'text/html'),
          text = doc.body.textContent;
        const infoDiv: any = document.getElementById('info');
        infoDiv.innerHTML = this.lessonData.description;
        this.textDescription = <string>text;
      }
    });
  }

  addComment() {
    const commentData = {
      lessonId: this.lessonData._id,
      text: this.form.value.text,
    };

    this.store.dispatch(createCommentRequest({commentData}));
  }

  ngOnDestroy(): void {
    this.lessonSub.unsubscribe();
  }
}
