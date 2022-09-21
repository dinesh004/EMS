import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAttendenceComponent } from './dialog-attendence.component';

describe('DialogAttendenceComponent', () => {
  let component: DialogAttendenceComponent;
  let fixture: ComponentFixture<DialogAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAttendenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
