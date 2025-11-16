import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteRegistersComponent } from './modal-delete-registers.component';

describe('ModalDeleteRegistersComponent', () => {
  let component: ModalDeleteRegistersComponent;
  let fixture: ComponentFixture<ModalDeleteRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteRegistersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
