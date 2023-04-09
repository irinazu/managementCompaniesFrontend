import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertainRequestComponent } from './certain-request.component';

describe('CertainRequestComponent', () => {
  let component: CertainRequestComponent;
  let fixture: ComponentFixture<CertainRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertainRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertainRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
