import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfServiceComponent } from './history-of-service.component';

describe('HistoryOfServiceComponent', () => {
  let component: HistoryOfServiceComponent;
  let fixture: ComponentFixture<HistoryOfServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOfServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
