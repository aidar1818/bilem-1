import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchLessonRequest } from '../../store/lessons/lessons.actions';
import { Observable, Subscription } from 'rxjs';
import { Course, Lesson } from '../../models/course.model';
import { NgForm } from '@angular/forms';
import { createCommentRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  course: Observable<Course | null>;
  courseSub!: Subscription;
  courseData!: Course | null;

  lesson: Observable<Lesson | null>;
  lessonSub!: Subscription;
  lessonData!: Lesson;
  lessonsArray: string[] = [];
  nextLessonId = '';
  previousLessonId = '';
  text: string = '';

  textDescription = '';

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
    this.lesson = store.select(state => state.lessons.lesson);
    this.course = store.select(state => state.courses.course);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['lessonId']) {
        this.store.dispatch(fetchLessonRequest({lessonId: params['lessonId'], action: 'addToPassed'}));
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

    this.courseSub = this.course.subscribe(course => {
      if (course) {
        this.lessonsArray = [];
        this.courseData = course;
        for (let i = 0; i < course.modules.length; i++) {
          for (let j = 0; j < course.modules[i].lessons.length; j++) {
            this.lessonsArray.push(course.modules[i].lessons[j]._id);
          }
        }
      }
      this.nextLessonId = this.lessonsArray[1];
      this.previousLessonId = this.lessonsArray[0];
    });
  }

  nextLesson(id: string) {
    const index = this.lessonsArray.indexOf(id);
    if (index === this.lessonsArray.length - 2) {
      this.nextLessonId = this.lessonsArray[this.lessonsArray.length - 1];
      this.previousLessonId = this.lessonsArray[this.lessonsArray.length - 2];
    } else {
      if (index === this.lessonsArray.length - 1) {
        this.nextLessonId = this.lessonsArray[this.lessonsArray.length - 1];
        this.previousLessonId = this.lessonsArray[this.lessonsArray.length - 2];
      } else {
        this.nextLessonId = this.lessonsArray[index + 2];
        this.previousLessonId = this.lessonsArray[index];
      }
    }
  }

  previousLesson(id: string) {
    const index = this.lessonsArray.indexOf(id);
    if (index === 1) {
      this.previousLessonId = this.lessonsArray[0];
      this.nextLessonId = this.lessonsArray[1];
    } else if (index === 0) {
      this.previousLessonId = this.lessonsArray[0];
      this.nextLessonId = this.lessonsArray[1];
    } else {
      this.previousLessonId = this.lessonsArray[index - 2];
      this.nextLessonId = this.lessonsArray[index];
    }
  }

  addComment() {
    const commentData = {
      lessonId: this.lessonData._id,
      text: this.form.value.text,
    };
    this.store.dispatch(createCommentRequest({commentData}));
    this.form.reset();
    this.text = '';
  }

  ngOnDestroy(): void {
    this.lessonSub.unsubscribe();
  }
}
