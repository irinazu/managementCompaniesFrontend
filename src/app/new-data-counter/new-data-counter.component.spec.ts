import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDataCounterComponent } from './new-data-counter.component';

describe('NewDataCounterComponent', () => {
  let component: NewDataCounterComponent;
  let fixture: ComponentFixture<NewDataCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDataCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDataCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
