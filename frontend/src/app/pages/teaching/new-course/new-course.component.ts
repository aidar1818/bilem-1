import { Component, OnInit } from '@angular/core';
import { SubcategoriesService } from '../../../services/subcategories.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
  showCard = false;

  constructor(private subcategoryService: SubcategoriesService) { }

  ngOnInit(): void {
  }

  showFreeCards() {
    this.showCard = true;
  }

  addPaidCourse() {
    this.subcategoryService.is_free = false;
  }

  addFreeCourse() {
    this.subcategoryService.is_free = true;
  }
}
