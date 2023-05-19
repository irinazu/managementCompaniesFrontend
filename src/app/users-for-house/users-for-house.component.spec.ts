import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersForHouseComponent } from './users-for-house.component';

describe('UsersForHouseComponent', () => {
  let component: UsersForHouseComponent;
  let fixture: ComponentFixture<UsersForHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersForHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersForHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
