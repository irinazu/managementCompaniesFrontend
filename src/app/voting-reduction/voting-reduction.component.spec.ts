import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingReductionComponent } from './voting-reduction.component';

describe('VotingReductionComponent', () => {
  let component: VotingReductionComponent;
  let fixture: ComponentFixture<VotingReductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingReductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
