import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBreakdownComponent } from './team-breakdown.component';

describe('TeamBreakdownComponent', () => {
  let component: TeamBreakdownComponent;
  let fixture: ComponentFixture<TeamBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamBreakdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
