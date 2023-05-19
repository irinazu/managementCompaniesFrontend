import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertainNewsComponent } from './certain-news.component';

describe('CertainNewsComponent', () => {
  let component: CertainNewsComponent;
  let fixture: ComponentFixture<CertainNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertainNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertainNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
