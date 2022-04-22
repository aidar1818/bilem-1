import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {
  moduleForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
      moduleTitle: '',
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
      lessonTitle: ''
    });
  }

  addLesson(moduleIndex: number) {
    this.getLessonsControls(moduleIndex).push(this.newLesson());
  }

  onSubmit() {
    console.log(this.moduleForm.value)
  }

  removeLesson(moduleIndex: number, lessonIndex: number) {
    this.getLessonsControls(moduleIndex).removeAt(lessonIndex);
  }

  removeModule(moduleIndex: number) {
    this.modules().removeAt(moduleIndex);
  }
}
