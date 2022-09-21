import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceUpdateComponent } from './attendence-update.component';

describe('AttendenceUpdateComponent', () => {
  let component: AttendenceUpdateComponent;
  let fixture: ComponentFixture<AttendenceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
