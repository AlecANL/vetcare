import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppointment } from 'src/app/modules/appointments/interfaces/appointment.interface';
import { HistoryTrxService } from '../../services/history-trx.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.scss'],
})
export class HistoryFormComponent implements OnInit {
  @Input() appointment!: IAppointment;
  form!: FormGroup;
  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly historyTrx: HistoryTrxService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: ['', Validators.required],
      diagnosis: ['', Validators.required],
      treatment: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  addHistory() {
    const formValues = this.form.value;
    this.historyTrx
      .create({
        appointment: this.appointment,
        date: formValues.date,
        diagnosis: formValues.diagnosis,
        treatment: formValues.treatment,
        comments: formValues.comments,
      })
      .subscribe({
        next: () => {
          this.activeModal.close();
        },
      });
  }

  closeModal() {
    this.activeModal.close();
  }
}
