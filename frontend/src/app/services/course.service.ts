import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Course, CourseData } from '../models/course.model';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  createCourse(courseData: CourseData) {
    const formData = new FormData();

    Object.keys(courseData).forEach(key => {
      if (courseData[key] !== null) {
        formData.append(key, courseData[key]);
      }
    });
    return this.http.post<Course>(env.apiUrl + '/courses', formData);
  }
}
