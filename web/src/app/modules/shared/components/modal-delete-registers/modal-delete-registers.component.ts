import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete-registers',
  templateUrl: './modal-delete-registers.component.html',
  styleUrls: ['./modal-delete-registers.component.scss'],
})
export class ModalDeleteRegistersComponent implements OnInit {
  @Input() title = '';
  @Input() description = '';

  constructor(private readonly activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal() {
    this.activeModal.close();
  }

  deleteAction() {
    this.activeModal.close({
      delete: true,
    });
  }
}
