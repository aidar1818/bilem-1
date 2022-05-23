import { Category } from './category.model';

export class Subcategory {
  constructor(
    public _id: string,
    public category: Category,
    public title: string,
    public description: string,
  ) {}
}

export interface CreateSubcategoryData {
  category: string,
  title: string
}



