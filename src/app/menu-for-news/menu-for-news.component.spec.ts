import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForNewsComponent } from './menu-for-news.component';

describe('MenuForNewsComponent', () => {
  let component: MenuForNewsComponent;
  let fixture: ComponentFixture<MenuForNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuForNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuForNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
