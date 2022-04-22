import { User } from './user.models';

export class Course {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public author: User,
    public students: User[],
    public subcategory: string,
    public price: number,
    public image: string,
    public is_free: boolean,
    public rate: number,
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



