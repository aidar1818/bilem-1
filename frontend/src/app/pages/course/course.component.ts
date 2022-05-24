import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import {
  addFavoriteCourseRequest,
  addLearningCourseRequest,
  fetchCourseInfoRequest
} from '../../store/course/course.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Review } from '../../models/review.model';
import { fetchReviewsRequest } from '../../store/reviews/review.actions';
import { fetchUserRequest } from '../../store/users/users.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course!: Course;
  courseOb: Observable<Course | null>;
  courseSub!: Subscription;
  reviewsArr: Review[] = [];
  review!: number;
  allReview = 0;
  favorite = false;
  learning = false;
  reviews: Observable<Review[]>;
  reviewsFetchLoading: Observable<boolean>;
  reviewsSub!: Subscription;
  user: Observable<null | User>;
  userOne!: User;
  userSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.user = store.select(state => state.users.user);
    this.reviews = store.select(state => state.reviews.reviews);
    this.courseOb = store.select(state => state.courses.course);
    this.reviewsFetchLoading = store.select(state => state.reviews.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUserRequest());
    this.store.dispatch(fetchCourseInfoRequest({id: this.route.snapshot.params['id']}));
    this.courseSub = this.courseOb.subscribe(c => {
      if (c) {
        this.course = c;
        this.store.dispatch(fetchReviewsRequest({id: this.course._id}));
      }
    });

    this.reviewsSub = this.reviews.subscribe(reviews => {
      this.reviewsArr = reviews;
      this.allReview = reviews.length
      let i = 0;
      reviews.forEach(review => {
        i = i + review.rate;
      });

      this.review = parseFloat((i / reviews.length).toFixed(1));
    });

    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.userOne = user;
        user.myCourses.forEach(course => {
          if (this.course) {
            if (course.course._id === this.route.snapshot.params['id']) {
              this.learning = true;
            }
          }
        });
        user.favoriteCourses.forEach(course => {
          if (course && course._id === this.route.snapshot.params['id']) {
            this.favorite = true;
          }
        });
      }
    });
  }

  star(i: number) {
    let count = 0
    this.reviewsArr.forEach(r => {
      if (i === r.rate) {
        count++
      }
    });

    return (count * 100) / this.allReview
  }

  addLearningCourse(id: string) {
    this.store.dispatch(addLearningCourseRequest({id}));
    this.learning = true;

  }

  addFavoriteCourse(id: string) {
    this.store.dispatch(addFavoriteCourseRequest({id}));
    this.favorite = true;
  }

  ngOnDestroy() {
    if (this.reviewsSub) {
      this.reviewsSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.courseSub) {
      this.courseSub.unsubscribe();
    }
  }
}
