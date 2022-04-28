export class Subcategory {
  constructor(
    public _id: string,
    public category: string,
    public title: string,
    public description: string,
  ) {}
}

export interface CreateSubcategoryData {
  category: string,
  title: string
}



