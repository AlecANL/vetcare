import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StockTrxService } from '../../services/stock-trx.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss'],
})
export class StockFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly stockTrx: StockTrxService,
    private readonly activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      minStock: ['', Validators.required],
    });
  }

  addToStock() {
    const values = this.form.value;
    this.stockTrx.addProduct(values).subscribe({
      next: (res: any) => {
        this.activeModal.close({
          ...values,
          id: res.id,
          stock_min: values.minStock,
          stock_actual: 0,
        });
      },
    });
  }
}
