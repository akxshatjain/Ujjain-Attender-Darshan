import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttenderProfileComponent } from './update-attender-profile.component';

describe('UpdateAttenderProfileComponent', () => {
  let component: UpdateAttenderProfileComponent;
  let fixture: ComponentFixture<UpdateAttenderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAttenderProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAttenderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
