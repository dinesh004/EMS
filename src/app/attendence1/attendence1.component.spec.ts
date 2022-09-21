import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attendence1Component } from './attendence1.component';

describe('Attendence1Component', () => {
  let component: Attendence1Component;
  let fixture: ComponentFixture<Attendence1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Attendence1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Attendence1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
