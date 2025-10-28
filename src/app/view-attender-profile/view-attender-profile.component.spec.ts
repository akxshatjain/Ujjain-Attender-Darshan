import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttenderProfileComponent } from './view-attender-profile.component';

describe('ViewAttenderProfileComponent', () => {
  let component: ViewAttenderProfileComponent;
  let fixture: ComponentFixture<ViewAttenderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAttenderProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAttenderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
