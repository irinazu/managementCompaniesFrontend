import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertainVoteComponent } from './certain-vote.component';

describe('CertainVoteComponent', () => {
  let component: CertainVoteComponent;
  let fixture: ComponentFixture<CertainVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertainVoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertainVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
