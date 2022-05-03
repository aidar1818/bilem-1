import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Injectable({
  providedIn: 'root'
})

export class CourseResolverService implements Resolve<Course> {

  constructor(
    private router: Router,
    private coursesService: CourseService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> | Observable<never> {
    const courseId = <string>route.params['id'];

    return this.coursesService.getCourseById(courseId).pipe(mergeMap(course => {
      if (course) {
        return of(course);
      }

      void this.router.navigate(['/']);
      return EMPTY;
    }));
  }
}
