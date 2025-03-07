import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostMdComponent } from './create-post-md.component';

describe('CreatePostMdComponent', () => {
  let component: CreatePostMdComponent;
  let fixture: ComponentFixture<CreatePostMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostMdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
