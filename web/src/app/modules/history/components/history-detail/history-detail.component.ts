import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IHistoryResponse } from '../../interface/history.interface';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
})
export class HistoryDetailComponent implements OnInit {
  openIndex: number | null = null;
  @Input() history!: IHistoryResponse;

  constructor(private readonly activatedModal: NgbActiveModal) {}

  ngOnInit(): void {}

  toggleRecord(idx: number) {
    this.openIndex = this.openIndex === idx ? null : idx;
  }
}
