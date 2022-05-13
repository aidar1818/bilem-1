import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createModuleRequest } from '../../store/modules/modules.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../../models/course.model';
import { fetchCourseInfoRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit, OnDestroy {
  moduleForm!: FormGroup;
  course: Observable<Course | null>;
  courseSub!: Subscription;
  titleText = true;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.course = store.select(state => state.courses.course);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let courseId = params['id'];
      this.store.dispatch(fetchCourseInfoRequest({id: courseId}));
    });

    this.moduleForm = this.fb.group({
      modules: this.fb.array([])
    });

    this.courseSub = this.course.subscribe(course => {
      if(course?.modules) {
        this.titleText = false;
        for(let i = 0; i < course.modules.length; i++) {
          const moduleArray = this.modules();

          moduleArray.push( this.fb.group({
            title: course.modules[i].title,
            lessons: this.fb.array([])
          }));


          for(let j = 0; j < course.modules[i].lessons.length; j++) {
            const moduleLessons = moduleArray.at(i).get('lessons') as FormArray;
            moduleLessons.push(this.fb.group({
              title: course.modules[i].lessons[j].title
            }));
          }
        }
      } else {
        this.titleText = true;
      }
    });

    this.moduleForm = this.fb.group({
      modules: this.fb.array([])
    });
  }

  modules(): FormArray {
    return this.moduleForm.get('modules') as FormArray;
  }

  newModule(): FormGroup {
    return this.fb.group({
      title: '',
      lessons: this.fb.array([])
    });
  }

  addModule() {
    this.modules().push(this.newModule());
  }

  getLessonsControls(moduleIndex: number): FormArray {
    return this.modules()
      .at(moduleIndex)
      .get('lessons') as FormArray;
  }

  newLesson(): FormGroup {
    return this.fb.group({
      title: ''
    });
  }

  addLesson(moduleIndex: number) {
    this.getLessonsControls(moduleIndex).push(this.newLesson());
  }

  onSubmit() {
    let id = '';
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    const module = this.moduleForm.value;

    this.store.dispatch(createModuleRequest({module, id}));
  }

  removeLesson(moduleIndex: number, lessonIndex: number) {
    this.getLessonsControls(moduleIndex).removeAt(lessonIndex);
  }

  removeModule(moduleIndex: number) {
    this.modules().removeAt(moduleIndex);
  }

  ngOnDestroy() {
    this.courseSub.unsubscribe();
  }
}
