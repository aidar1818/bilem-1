import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Course, CourseData } from '../models/course.model';
import { map } from 'rxjs';
import { Module } from '../models/module.model';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }

  fetchCourses() {
    return this.http.get<Course[]>(env.apiUrl + '/courses');
  }

  getUserCourses(id: string) {
    return this.http.get<Course[]>(env.apiUrl + '/courses?user=' + id).pipe(
      map(response => {
        return response.map(courseData => {
          return new Course(
            courseData._id,
            courseData.title,
            courseData.description,
            courseData.author,
            courseData.students,
            courseData.subcategory,
            courseData.price,
            courseData.image,
            courseData.is_free,
            courseData.rate,
          );
        });
      })
    );
  }

  createCourse(courseData: CourseData) {
    const formData = new FormData();

    Object.keys(courseData).forEach(key => {
      if (courseData[key] !== null) {
        formData.append(key, courseData[key]);
      }
    });
    return this.http.post<Course>(env.apiUrl + '/courses', formData);
  }

  addModules(moduleData: Module, id: string) {
    return this.http.post<Module>(env.apiUrl + `/courses/course/${id}`, moduleData);
  };

  search(courseData: {}) {
    return this.http.post<Course[]>(env.apiUrl + `/courses/search`, courseData).pipe(
      map(response => {
        return response.map(courseData => {
          return new Course(
            courseData._id,
            courseData.title,
            courseData.description,
            courseData.author,
            courseData.students,
            courseData.subcategory,
            courseData.price,
            courseData.image,
            courseData.is_free,
            courseData.rate,
          );
        });
      })
    );
  }
}
