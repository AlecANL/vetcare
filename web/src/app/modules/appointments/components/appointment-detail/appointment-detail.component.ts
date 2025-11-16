import { Component, Input, OnInit } from '@angular/core';
import { IAppointment } from '../../interfaces/appointment.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
})
export class AppointmentDetailComponent implements OnInit {
  @Input() appointment!: IAppointment;

  statusClassNameMap: Record<string, string> = {
    pendiente: 'badge-blue',
  };

  constructor(private readonly activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal() {
    this.activeModal.close();
  }
}
