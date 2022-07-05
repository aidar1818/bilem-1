import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { Course } from '../../../models/course.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Input() is_free!: boolean;

  learning = false;
  user: Observable<null | User>;
  userSub!: Subscription;


  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);

  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      if (user) {
        user.myCourses.forEach(course => {
          if (course.course._id === this.course._id) {
            this.learning = true;
          }
        });
      }
    })
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
