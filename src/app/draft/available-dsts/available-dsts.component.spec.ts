import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDstsComponent } from './available-dsts.component';

describe('AvailableDstsComponent', () => {
  let component: AvailableDstsComponent;
  let fixture: ComponentFixture<AvailableDstsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableDstsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableDstsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
