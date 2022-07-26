import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePlayersComponent } from './available-players.component';

describe('AvailablePlayersComponent', () => {
  let component: AvailablePlayersComponent;
  let fixture: ComponentFixture<AvailablePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePlayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailablePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
