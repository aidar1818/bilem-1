import { Component, OnInit } from '@angular/core';
import { SubcategoriesService } from '../../services/subcategories.service';

@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent implements OnInit {
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
