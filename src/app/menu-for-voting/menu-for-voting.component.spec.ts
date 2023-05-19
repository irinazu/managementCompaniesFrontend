import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForVotingComponent } from './menu-for-voting.component';

describe('MenuForVotingComponent', () => {
  let component: MenuForVotingComponent;
  let fixture: ComponentFixture<MenuForVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuForVotingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuForVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
