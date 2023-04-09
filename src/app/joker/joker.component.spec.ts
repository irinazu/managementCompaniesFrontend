import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokerComponent } from './joker.component';

describe('JokerComponent', () => {
  let component: JokerComponent;
  let fixture: ComponentFixture<JokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
