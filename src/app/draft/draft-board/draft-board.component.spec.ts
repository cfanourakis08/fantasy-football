import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftBoardComponent } from './draft-board.component';

describe('DraftBoardComponent', () => {
  let component: DraftBoardComponent;
  let fixture: ComponentFixture<DraftBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
