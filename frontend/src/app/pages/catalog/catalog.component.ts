import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCoursesRequest, searchCoursesRequest } from '../../store/course/course.actions';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  courses: Observable<Course[]>;
  @ViewChild('searchForm') searchForm!: NgForm;
  is_free = false;
  myControl = new FormControl();
  courseTitles!: string[];
  filteredOptions!: Observable<Course[]>;
  coursesArray!: Course[];

  constructor(private store: Store<AppState>) {
    this.courses = store.select(state => state.courses.courses);
  }

  ngOnInit(): void {
    this.courses.subscribe(courses => {
      this.coursesArray = courses;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.title)),
      map(title => (title ? this._filter(title) : this.coursesArray.slice())),
    );

    this.store.dispatch(fetchCoursesRequest());
  }

  displayFn(course: Course): string {
    return course && course.title ? course.title : '';
  }

  private _filter(name: string): Course[] {
    const filterValue = name.toLowerCase();

    return this.coursesArray.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    let courseData = {};

    if(this.searchForm.value.is_free === '' || !this.searchForm.value.is_free) {
      courseData = {
        title: this.searchForm.value.title,
        is_free: this.searchForm.value.is_free,
      }
    }

    if(this.searchForm.value.is_free) {
       courseData = {
        title: this.searchForm.value.title,
        is_free: this.searchForm.value.is_free,
      }
    }

    this.store.dispatch(searchCoursesRequest({courseData}));
  }
}
