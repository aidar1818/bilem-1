import { Course } from './course.model';
import { User } from './user.model';

export class Review {
  constructor(
    public _id: string,
    public user: User,
    public course: Course,
    public text: string,
    public rate: number,
    public datetime: string,
  ) {}
}
