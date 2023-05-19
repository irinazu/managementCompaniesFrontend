import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoForHeadManagementCompanyComponent } from './info-for-head-management-company.component';

describe('InfoForHeadManagementCompanyComponent', () => {
  let component: InfoForHeadManagementCompanyComponent;
  let fixture: ComponentFixture<InfoForHeadManagementCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoForHeadManagementCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoForHeadManagementCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
