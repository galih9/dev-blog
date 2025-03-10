import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPageComponent } from './learning-page.component';

describe('LearningPageComponent', () => {
  let component: LearningPageComponent;
  let fixture: ComponentFixture<LearningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
