import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentHomeComponent } from './appointment-home.component';

describe('AppointmentHomeComponent', () => {
  let component: AppointmentHomeComponent;
  let fixture: ComponentFixture<AppointmentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
