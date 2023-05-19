import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCompanyRequisitesComponent } from './management-company-requisites.component';

describe('ManagementCompanyRequisitesComponent', () => {
  let component: ManagementCompanyRequisitesComponent;
  let fixture: ComponentFixture<ManagementCompanyRequisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCompanyRequisitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCompanyRequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
