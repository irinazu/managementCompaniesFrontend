import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCompanyInfoComponent } from './management-company-info.component';

describe('ManagementCompanyInfoComponent', () => {
  let component: ManagementCompanyInfoComponent;
  let fixture: ComponentFixture<ManagementCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCompanyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
