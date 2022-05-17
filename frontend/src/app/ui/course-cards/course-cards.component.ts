import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCoursesRequest } from '../../store/course/course.actions';

@Component({
  selector: 'app-course-cards',
  templateUrl: './course-cards.component.html',
  styleUrls: ['./course-cards.component.css']
})
export class CourseCardsComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() is_free!: boolean;

  courses!: Observable<Course[]>;
  coursesSub!: Subscription;
  coursesArray!: Course[];
  loading: Observable<boolean>;
  popularCourses!: Course[] | null;
  newCourses!: Course[] | null;

  constructor(private store: Store<AppState>) {
    this.courses = store.select(state => state.courses.courses);
    this.loading = store.select(state => state.courses.fetchLoading);
    this.coursesSub = this.courses.subscribe(courses => {
      if(courses) {
        this.coursesArray = courses;
        this.popularCourses = courses.filter(course => {
          return course.students.length >= 1;
        });
       this.newCourses = courses.slice(-6);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCoursesRequest());
  }

  ngOnDestroy(): void {
    this.coursesSub.unsubscribe();
  }
}
