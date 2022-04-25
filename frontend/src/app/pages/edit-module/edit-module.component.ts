import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createModuleRequest } from '../../store/modules/modules.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {
  moduleForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
}
