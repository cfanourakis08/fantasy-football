import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableQbsComponent } from './available-qbs.component';

describe('AvailableQbsComponent', () => {
  let component: AvailableQbsComponent;
  let fixture: ComponentFixture<AvailableQbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableQbsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableQbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
