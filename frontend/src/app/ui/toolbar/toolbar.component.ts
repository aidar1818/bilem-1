import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUserRequest } from '../../store/users/users.actions';
import { Subcategory } from '../../models/subcategory.model';
import { Course } from '../../models/course.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  userId = '';
  courses: Observable<Course[]>;
  coursesSub!: Subscription;
  coursesBySubcategorySub!: Subscription;
  subCategoriesArray!: Subcategory[];
  coursesArray!: Course[];
  myControl = new FormControl();
  filteredOptions!: Observable<Course[]>;

  constructor(
    private store: Store<AppState>,
    ) {
    this.user = store.select(state => state.users.user);
    this.courses = store.select(state => state.courses.courses);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.title)),
      map(title => (title ? this._filter(title) : this.coursesArray.slice())),
    );

    this.coursesSub = this.courses.subscribe(courses => {
      if (courses) {
        this.coursesArray = courses;
      }
    });

    this.userSub = this.user.subscribe(user => {
      if(user) {
        this.userId = user._id;
      }
    });
  }


  displayFn(course: Course): string {
    return course && course.title ? course.title : '';
  }

  private _filter(name: string): Course[] {
    const filterValue = name.toLowerCase();

    return this.coursesArray.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  logout(){
    this.store.dispatch(logoutUserRequest());
  }

  ngOnDestroy(): void {
    this.coursesSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
