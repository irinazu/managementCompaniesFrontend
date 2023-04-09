import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateOfficeComponent } from './private-office.component';

describe('PrivateOfficeComponent', () => {
  let component: PrivateOfficeComponent;
  let fixture: ComponentFixture<PrivateOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
