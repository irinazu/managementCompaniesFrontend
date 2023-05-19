import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesRequestsComponent } from './houses-requests.component';

describe('HousesRequestsComponent', () => {
  let component: HousesRequestsComponent;
  let fixture: ComponentFixture<HousesRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousesRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
