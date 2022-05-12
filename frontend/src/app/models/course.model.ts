import { User } from './user.model';
import { Lessons } from './module.model';

export interface Module {
  title: string,
  _id: string,
  lessons: Lessons[]
}

export class Course {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public information: string,
    public author: User,
    public students: User[],
    public modules: Module[],
    public subcategory: string,
    public price: number,
    public image: string,
    public is_free: boolean,
    public rate: number,
    public is_published: boolean,
  ) {}
}

export interface CourseData {
  [key: string]: any,
  title: string,
  description: string,
  subcategory: string,
  price: number | null,
  image: File | null,
  is_free: boolean,
}



