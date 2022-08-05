import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTesComponent } from './available-tes.component';

describe('AvailableTesComponent', () => {
  let component: AvailableTesComponent;
  let fixture: ComponentFixture<AvailableTesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableTesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableTesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
