import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteringDevicesComponent } from './metering-devices.component';

describe('MeteringDevicesComponent', () => {
  let component: MeteringDevicesComponent;
  let fixture: ComponentFixture<MeteringDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeteringDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteringDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
