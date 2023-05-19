import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertainChatComponentComponent } from './certain-chat-component.component';

describe('CertainChatComponentComponent', () => {
  let component: CertainChatComponentComponent;
  let fixture: ComponentFixture<CertainChatComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertainChatComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertainChatComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
