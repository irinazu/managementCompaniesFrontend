import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsRedactionComponent } from './news-redaction.component';

describe('NewsRedactionComponent', () => {
  let component: NewsRedactionComponent;
  let fixture: ComponentFixture<NewsRedactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsRedactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsRedactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
