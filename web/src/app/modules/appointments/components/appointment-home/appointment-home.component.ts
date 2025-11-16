import { Component, HostListener, OnInit } from '@angular/core';
import {
  IAppointment,
  TAppointmentList,
} from '../../interfaces/appointment.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HistoryFormComponent } from 'src/app/modules/history/components/history-form/history-form.component';
import { AppointmentDetailComponent } from '../appointment-detail/appointment-detail.component';
import { AppointmentInvoiceComponent } from '../appointment-invoice/appointment-invoice.component';
import { TStockList } from 'src/app/modules/stock/interfaces/stock.interface';

@Component({
  selector: 'app-appointment-home',
  templateUrl: './appointment-home.component.html',
  styleUrls: ['./appointment-home.component.scss'],
})
export class AppointmentHomeComponent implements OnInit {
  currentOpenIndex: number | null = null;
  appointmentList: TAppointmentList = [];
  products: TStockList = [];

  statusClassNameMap: Record<string, string> = {
    pendiente: 'badge-blue',
  };

  constructor(
    private readonly modalService: NgbModal,
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.appointmentList = this.activatedRoute.snapshot.data['list'] || [];
    this.products = this.activatedRoute.snapshot.data['products'] || [];
  }

  closeAllTooltips(): void {
    this.currentOpenIndex = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.actions-cell')) {
      this.closeAllTooltips();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAllTooltips();
  }

  toggleTooltip(event: any, index: number): void {
    event.stopPropagation();
    this.currentOpenIndex = this.currentOpenIndex === index ? null : index;
  }

  addNewAppointment() {
    const modal = this.modalService.open(AppointmentFormComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal appointment',
    });

    modal.componentInstance.mode = 'CREATE';

    modal.result.then((result: undefined | IAppointment) => {
      if (!result) return;

      this.appointmentList.push(result);
    });
  }

  addNewHistory(event: MouseEvent, appointment: any) {
    const modal = this.modalService.open(HistoryFormComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal history',
    });

    modal.componentInstance.mode = 'CREATE';
    modal.componentInstance.appointment = appointment;

    modal.result.then((result: undefined | any) => {
      if (!result) return;
    });
  }

  viewAppointment(event: MouseEvent, appointment: any) {
    const modal = this.modalService.open(AppointmentDetailComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal appointment',
    });

    modal.componentInstance.appointment = appointment;
  }

  addInvoice(event: MouseEvent, appointment: any) {
    const modal = this.modalService.open(AppointmentInvoiceComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal invoice',
    });

    modal.componentInstance.appointment = appointment;
    modal.componentInstance.products = this.products;
  }

  updateAppointment(event: MouseEvent, id: number) {}

  deleteAppointment(event: MouseEvent, id: number) {}
}
