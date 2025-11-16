import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStock, TStockList } from '../../interfaces/stock.interface';
import { StockAddFormComponent } from '../stock-add-form/stock-add-form.component';
import { StockFormComponent } from '../stock-form/stock-form.component';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.scss'],
})
export class StockHomeComponent implements OnInit {
  productList: TStockList = [];
  listFiltered = [...this.productList];
  currentIndex = 0;
  typeList = ['', 'Medicamentos', 'Vacunas', 'Alimentos', 'Accesorios'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly modalService: NgbModal
  ) {}

  currentOpenIndex: number | null = null;
  ngOnInit(): void {
    this.productList = this.activatedRoute.snapshot.data['list'] || [];
    this.listFiltered = [...this.productList];
  }

  toggle(i: number, val: string) {
    this.currentIndex = i;

    this.listFiltered = this.productList.filter((product) => {
      return product.type.includes(val.toLowerCase());
    });
  }

  addNewProduct() {
    const modal = this.modalService.open(StockFormComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal',
    });

    modal.result.then((result: undefined | IStock) => {
      if (!result) return;

      this.listFiltered.push(result);
    });
  }

  viewProduct(event: MouseEvent, product: any): void {}

  deleteProduct(event: MouseEvent, product: any): void {}

  updateProduct(event: MouseEvent, product: any): void {
    const modal = this.modalService.open(StockAddFormComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal',
    });

    modal.componentInstance.product = product;

    modal.result.then((result: undefined | IStock) => {
      if (!result) return;

      this.listFiltered = this.listFiltered.map((product) => {
        if (product.id === result.id) {
          return result;
        }

        return product;
      });
    });
  }

  toggleTooltip(event: any, index: number): void {
    event.stopPropagation();
    this.currentOpenIndex = this.currentOpenIndex === index ? null : index;
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
}
