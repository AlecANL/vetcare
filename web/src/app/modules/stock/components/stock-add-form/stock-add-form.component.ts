import { Component, Input, OnInit } from '@angular/core';
import { IStock } from '../../interfaces/stock.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockTrxService } from '../../services/stock-trx.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stock-add-form',
  templateUrl: './stock-add-form.component.html',
  styleUrls: ['./stock-add-form.component.scss'],
})
export class StockAddFormComponent implements OnInit {
  @Input() product!: IStock;
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly stockTrx: StockTrxService,
    private readonly activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      quantity: [0, Validators.required],
      comments: ['', Validators.required],
    });
  }

  addToStock() {
    const values = this.form.value;
    this.stockTrx
      .addToStock(this.product.id, values.quantity, values.comments)
      .subscribe({
        next: () => {
          this.activeModal.close({
            ...this.product,
            stock_actual:
              Number(this.product.stock_actual) + Number(values.quantity),
          });
        },
      });
  }
}
