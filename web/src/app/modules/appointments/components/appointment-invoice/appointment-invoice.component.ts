import { Component, Input, OnInit } from '@angular/core';
import { IAppointment } from '../../interfaces/appointment.interface';
import {
  IStock,
  TStockList,
} from 'src/app/modules/stock/interfaces/stock.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentsTrxService } from '../../services/appointments-trx.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-invoice',
  templateUrl: './appointment-invoice.component.html',
  styleUrls: ['./appointment-invoice.component.scss'],
})
export class AppointmentInvoiceComponent implements OnInit {
  @Input() appointment!: IAppointment;
  @Input() products: TStockList = [];
  form!: FormGroup;

  productsToInvoice: TStockList = [];
  total = 0;

  constructor(
    private fb: FormBuilder,
    private readonly appointmentTrx: AppointmentsTrxService,
    private readonly activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      product: ['', Validators.required],
    });
  }

  calcTotal() {
    const total = this.productsToInvoice.reduce((acc, current) => {
      return acc + Number(current.price);
    }, 0);

    this.total = total;
  }

  addToInvoice() {
    const productId = this.form.value.product;
    const product = this.products.find((pr) => pr.id === Number(productId));
    if (!product) return;
    this.productsToInvoice.push(product);
    this.calcTotal();
  }

  saveToInvoice() {
    const productToInvoice = this.groupProducts(this.productsToInvoice).map(
      (prod) => {
        return {
          id: prod.id,
          quantity: prod.quantity,
          subTotal: Number(prod.price) * prod.quantity,
        };
      }
    );

    const bodyRequest = {
      clientId: this.appointment.client.id,
      appointmentId: this.appointment.id,
      total: this.total,
      products: productToInvoice,
    };

    this.appointmentTrx.createInvoice(bodyRequest).subscribe({
      next: () => {
        this.activeModal.close();
      },
      error: () => {
        alert('ha ocurrido un error al intetar facturar');
      },
    });
  }

  clearInvoice() {
    this.total = 0;
    this.productsToInvoice = [];
  }

  groupProducts(products: TStockList, key = 'id') {
    const map = new Map();

    for (const item of products) {
      const t = item as any;
      const identifier = t[key];

      if (!map.has(identifier)) {
        map.set(identifier, { ...item, quantity: t?.quantity || 1 });
      } else {
        const existing = map.get(identifier);
        existing.quantity += t?.quantity || 1;
      }
    }

    return Array.from(map.values());
  }
}
