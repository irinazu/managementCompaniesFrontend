import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForServiceComponent } from './menu-for-service.component';

describe('MenuForServiceComponent', () => {
  let component: MenuForServiceComponent;
  let fixture: ComponentFixture<MenuForServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuForServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuForServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
