import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeteringDeviceComponent } from './add-metering-device.component';

describe('AddMeteringDeviceComponent', () => {
  let component: AddMeteringDeviceComponent;
  let fixture: ComponentFixture<AddMeteringDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeteringDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeteringDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
