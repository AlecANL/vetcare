import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInvoice } from '../../interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-home',
  templateUrl: './invoice-home.component.html',
  styleUrls: ['./invoice-home.component.scss'],
})
export class InvoiceHomeComponent implements OnInit {
  invoiceList: Array<IInvoice> = [];

  currentOpenIndex: number | null = null;

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.invoiceList = this.activatedRoute.snapshot.data['list'] || [];
  }

  viewDetail(invoice: IInvoice) {}

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
