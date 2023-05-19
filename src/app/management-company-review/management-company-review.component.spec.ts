import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCompanyReviewComponent } from './management-company-review.component';

describe('ManagementCompanyReviewComponent', () => {
  let component: ManagementCompanyReviewComponent;
  let fixture: ComponentFixture<ManagementCompanyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCompanyReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCompanyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
