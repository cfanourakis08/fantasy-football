import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableWrsComponent } from './available-wrs.component';

describe('AvailableWrsComponent', () => {
  let component: AvailableWrsComponent;
  let fixture: ComponentFixture<AvailableWrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableWrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableWrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
