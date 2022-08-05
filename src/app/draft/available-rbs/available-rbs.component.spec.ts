import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableRbsComponent } from './available-rbs.component';

describe('AvailableRbsComponent', () => {
  let component: AvailableRbsComponent;
  let fixture: ComponentFixture<AvailableRbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableRbsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableRbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
