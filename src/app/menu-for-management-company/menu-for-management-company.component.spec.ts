import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForManagementCompanyComponent } from './menu-for-management-company.component';

describe('MenuForManagementCompanyComponent', () => {
  let component: MenuForManagementCompanyComponent;
  let fixture: ComponentFixture<MenuForManagementCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuForManagementCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuForManagementCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
