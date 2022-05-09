import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBySubcategoryComponent } from './courses-by-subcategory.component';

describe('CoursesByCategoryComponent', () => {
  let component: CoursesBySubcategoryComponent;
  let fixture: ComponentFixture<CoursesBySubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesBySubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesBySubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
