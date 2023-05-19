import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForRequestComponent } from './menu-for-request.component';

describe('MenuForRequestComponent', () => {
  let component: MenuForRequestComponent;
  let fixture: ComponentFixture<MenuForRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuForRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuForRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
