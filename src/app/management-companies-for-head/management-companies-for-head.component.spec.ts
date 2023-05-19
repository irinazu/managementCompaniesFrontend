import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCompaniesForHeadComponent } from './management-companies-for-head.component';

describe('ManagementCompaniesForHeadComponent', () => {
  let component: ManagementCompaniesForHeadComponent;
  let fixture: ComponentFixture<ManagementCompaniesForHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCompaniesForHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCompaniesForHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
