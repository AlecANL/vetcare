import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser, TUserList } from '../../interfaces/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';
import { ModalDeleteRegistersComponent } from 'src/app/modules/shared/components/modal-delete-registers/modal-delete-registers.component';
import { UsersTrxService } from '../../services/users-trx.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  userList: TUserList = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly modalService: NgbModal,
    private readonly userTrx: UsersTrxService
  ) {}

  currentOpenIndex: number | null = null;

  ngOnInit(): void {
    this.userList = this.activatedRoute.snapshot.data['userList'] || [];
    this.userList = this.userList.filter((user) => user.status === 'A');
    this.userList = this.userList.map((user) => {
      return {
        ...user,
        badge: this.mappedUserBadge(user.rol_id),
      };
    });
  }

  private mappedUserBadge(role: number) {
    const roleBadgeMap: Record<number, string> = {
      1: 'badge-admin',
      2: 'badge-asistente',
      3: 'badge-recepcionista',
    };

    return roleBadgeMap[role] || 'default-badge';
  }

  toggleTooltip(event: any, index: number): void {
    event.stopPropagation();
    this.currentOpenIndex = this.currentOpenIndex === index ? null : index;
  }

  addNewUser() {
    const modal = this.modalService.open(UserFormComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal',
    });

    modal.componentInstance.mode = 'CREATE';

    modal.result.then((result: undefined | IUser) => {
      if (!result) return;

      this.userList.push(result);
    });
  }

  viewUser(event: MouseEvent, user: IUser): void {
    event.stopPropagation();
    this.closeAllTooltips();

    const modal = this.modalService.open(UserDetailComponent, {
      centered: true,
      size: 'md',
      windowClass: 'custom-modal',
    });

    modal.componentInstance.user = user;
  }

  editUser(event: MouseEvent, userId: number): void {
    event.stopPropagation();
    this.closeAllTooltips();

    const currentUser = this.userList.find((user) => user.id === userId);
    const modal = this.modalService.open(UserFormComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal',
    });

    modal.componentInstance.mode = 'UPDATE';
    modal.componentInstance.user = currentUser;

    modal.result.then((result: undefined | IUser) => {
      if (!result) return;

      this.userList = this.userList.map((user) => {
        if (user.id === result.id) {
          return result;
        }

        return user;
      });
    });
  }

  deleteUser(event: MouseEvent, userId: number): void {
    event.stopPropagation();
    this.closeAllTooltips();

    const modal = this.modalService.open(ModalDeleteRegistersComponent, {
      centered: true,
      size: 'md',
      windowClass: 'custom-modal',
    });

    modal.componentInstance.title = 'Eliminar Usuario';
    modal.componentInstance.description =
      'Esta acción eliminará permanentemente al usuario';

    modal.result.then((result: undefined | Record<any, any>) => {
      if (!result) return;

      this.userTrx.deleteUser(userId).subscribe({
        next: () => {
          this.userList = this.userList.filter((user) => user.id !== userId);
        },
      });
    });
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
