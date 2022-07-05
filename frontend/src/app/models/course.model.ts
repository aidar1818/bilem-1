import { User } from './user.model';

export interface Comment {
  user: {
    _id: string,
    displayName: string,
  },
  text: string,
  datetime: string,
}

export interface CommentData {
  lessonId: string,
  text: string,
}

export class LessonClass {
  constructor(
    public _id: string,
    public title: string,
    public description: string | null,
    public video: string | null,
    public comments: Comment[],
  ) {
  }
}

export interface Lesson {
  [key: string]: any,
  _id: string,
  title: string,
  description: string | null,
  video: string | null | File,
  comments: Comment[],
}

export interface LessonData {
  [key: string]: any,
  _id: string,
  title: string,
  description: string | null,
  video: string | null | File,
  comments: Comment[],
  timestamp: string,
}

export interface Module {
  title: string,
  _id: string,
  lessons: LessonData[]
}

export interface FetchTariffData {
  courses: Course[],
  users: User[],
  paidCourses: Course[],
}

export interface TariffData {
  courses: number,
  users: number,
  paidCourses: number,
}

export class Course {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public information: string,
    public author: User,
    public students: string[],
    public modules: Module[],
    public subcategory: string,
    public price: number,
    public image: string,
    public is_free: boolean,
    public rate: number,
    public is_published: boolean,
    public promoVideo: string,
  ) {
  }
}

export interface CourseData {
  [key: string]: any,

  title: string,
  description: string,
  subcategory: string,
  price: number | null,
  image: File | null,
  is_free: boolean,
  promoVideo: string | null,
}

// export interface VideoData {
//   title: string,
//   description: string,
//   name: string,
// }


