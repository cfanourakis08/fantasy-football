import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDraftFormComponent } from './pre-draft-form.component';

describe('PreDraftFormComponent', () => {
  let component: PreDraftFormComponent;
  let fixture: ComponentFixture<PreDraftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreDraftFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreDraftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
