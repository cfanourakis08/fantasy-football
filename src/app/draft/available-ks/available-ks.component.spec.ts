import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableKsComponent } from './available-ks.component';

describe('AvailableKsComponent', () => {
  let component: AvailableKsComponent;
  let fixture: ComponentFixture<AvailableKsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableKsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableKsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
