import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestChoicesComponent } from './best-choices.component';

describe('BestChoicesComponent', () => {
  let component: BestChoicesComponent;
  let fixture: ComponentFixture<BestChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestChoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
