import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoryFormComponent } from '../history-form/history-form.component';
import { ActivatedRoute } from '@angular/router';
import {
  IHistoryResponse,
  THistoryList,
} from '../../interface/history.interface';
import { HistoryDetailComponent } from '../history-detail/history-detail.component';

@Component({
  selector: 'app-history-home',
  templateUrl: './history-home.component.html',
  styleUrls: ['./history-home.component.scss'],
})
export class HistoryHomeComponent implements OnInit {
  historyList: THistoryList = [];

  constructor(
    private readonly modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.historyList = this.activatedRoute.snapshot.data['list'] || [];
  }

  viewDetail(history: IHistoryResponse) {
    const modal = this.modalService.open(HistoryDetailComponent, {
      centered: true,
      size: 'md',
      windowClass: 'custom-modal history-detail',
    });

    modal.componentInstance.history = history;
  }
}
