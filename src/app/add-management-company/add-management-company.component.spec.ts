import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagementCompanyComponent } from './add-management-company.component';

describe('AddManagementCompanyComponent', () => {
  let component: AddManagementCompanyComponent;
  let fixture: ComponentFixture<AddManagementCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManagementCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManagementCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
