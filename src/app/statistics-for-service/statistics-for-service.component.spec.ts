import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsForServiceComponent } from './statistics-for-service.component';

describe('StatisticsForServiceComponent', () => {
  let component: StatisticsForServiceComponent;
  let fixture: ComponentFixture<StatisticsForServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsForServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsForServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
