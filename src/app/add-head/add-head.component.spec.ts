import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeadComponent } from './add-head.component';

describe('AddHeadComponent', () => {
  let component: AddHeadComponent;
  let fixture: ComponentFixture<AddHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
