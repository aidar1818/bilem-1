import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, environment as env } from '../../environments/environment';
import { CommentData, Course, CourseData, FetchTariffData, Lesson, LessonClass } from '../models/course.model';
import { map } from 'rxjs';
import { Module } from '../models/module.model';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}

  fetchCourses() {
    return this.http.get<Course[]>(env.apiUrl + '/courses').pipe(
      map(response => {
        return response.map(courseData => {
          return new Course(
            courseData._id,
            courseData.title,
            courseData.description,
            courseData.information,
            courseData.author,
            courseData.students,
            courseData.modules,
            courseData.subcategory,
            courseData.price,
            courseData.image,
            courseData.is_free,
            courseData.rate,
            courseData.is_published,
            courseData.promoVideo,
          );
        });
      })
    );
  }

  fetchTariffData() {
    return this.http.get<FetchTariffData>(env.apiUrl + '/courses/tariff/amount').pipe(
      map(response => {
        return response;
      })
    );
  }

  getUserCourses(id: string) {
    return this.http.get<Course[]>(env.apiUrl + '/courses?user=' + id).pipe(
      map(response => {
        return response.map(courseData => {
          return new Course(
            courseData._id,
            courseData.title,
            courseData.description,
            courseData.information,
            courseData.author,
            courseData.students,
            courseData.modules,
            courseData.subcategory,
            courseData.price,
            courseData.image,
            courseData.is_free,
            courseData.rate,
            courseData.is_published,
            courseData.promoVideo,
          );
        });
      })
    );
  }

  getCoursesByCategory(id: string) {
    return this.http.get<Course[]>(env.apiUrl + '/courses?category=' + id).pipe(
      map(response => {
        return response.map(courseData => {
          return new Course(
            courseData._id,
            courseData.title,
            courseData.description,
            courseData.information,
            courseData.author,
            courseData.students,
            courseData.modules,
            courseData.subcategory,
            courseData.price,
            courseData.image,
            courseData.is_free,
            courseData.rate,
            courseData.is_published,
            courseData.promoVideo,
          );
        });
      })
    );
  }

  getCoursesBySubcategory(id: string) {
    return this.http.get<Course[]>(env.apiUrl + '/courses?subcategory=' + id).pipe(
      map(response => {
        return response.map(courseData => {
          return new Course(
            courseData._id,
            courseData.title,
            courseData.description,
            courseData.information,
            courseData.author,
            courseData.students,
            courseData.modules,
            courseData.subcategory,
            courseData.price,
            courseData.image,
            courseData.is_free,
            courseData.rate,
            courseData.is_published,
            courseData.promoVideo,
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
            courseData.information,
            courseData.author,
            courseData.students,
            courseData.modules,
            courseData.subcategory,
            courseData.price,
            courseData.image,
            courseData.is_free,
            courseData.rate,
            courseData.is_published,
            courseData.promoVideo,
          );
        });
      })
    );
  }

  getCourseById(id: string) {
    return this.http.get<Course | null>(env.apiUrl + '/courses/' + id).pipe(
      map(response => {
        if (response) {
          return new Course(
            response._id,
            response.title,
            response.description,
            response.information,
            response.author,
            response.students,
            response.modules,
            response.subcategory,
            response.price,
            response.image,
            response.is_free,
            response.rate,
            response.is_published,
            response.promoVideo,
          );
        }
        return null;
      })
    );
  }

  addLearningCourses(id: string) {
    return this.http.post<string>(environment.apiUrl + `/courses/addCourse`, {course: id}).pipe(
      map(response => {
        return response;
      })
    );
  }

  addFavoriteCourses(id: string) {
    return this.http.post<string>(environment.apiUrl + `/courses/addFavoriteCourse`, {favoriteCourse: id}).pipe(
      map(response => {
        return response;
      })
    );
  }

  removeCourse(id: string) {
    return this.http.delete(env.apiUrl + '/courses/' + id);
  }

  publishCourse(id: string) {
    return this.http.post(`${env.apiUrl}/courses/${id}/publish`, {});
  }

  addLesson(lessonData: Lesson) {
    const formData = new FormData();

    Object.keys(lessonData).forEach(key => {
      if (lessonData[key] !== null) {
        formData.append(key, lessonData[key]);
      }
    });

    return this.http.post<Course>(env.apiUrl + `/courses/lesson/${lessonData._id}`, formData);
  }

  getLessonData(lessonId: string, action?: string) {
    const url = action ? `/courses/lesson/${lessonId}?action=addToPassed` : `/courses/lesson/${lessonId}`;
    return this.http.get<LessonClass | null>(env.apiUrl + url)
      .pipe(map(result => {
        if (!result) {
          return null;
        }

        return new LessonClass(result._id, result.title, result.description, result.video, result.comments);
      }));
  }

  addComment(commentData: CommentData) {
    return this.http.post<Course>(env.apiUrl + `/courses/course/lesson/${commentData.lessonId}/addComment`, commentData).pipe(
      map(response => {
        return new Course(
          response._id,
          response.title,
          response.description,
          response.information,
          response.author,
          response.students,
          response.modules,
          response.subcategory,
          response.price,
          response.image,
          response.is_free,
          response.rate,
          response.is_published,
          response.promoVideo,
        );
      })
    );
  }

  removeLesson(id: string) {
    return this.http.delete(env.apiUrl + '/courses/lesson/' + id);
  }
}
