import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersTrxService } from '../../services/users-trx.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() mode: 'CREATE' | 'UPDATE' = 'CREATE';
  @Input() user: IUser | null = null;

  userForm!: FormGroup;

  constructor(
    private readonly activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private readonly userTrx: UsersTrxService,
    private readonly utils: UtilsService
  ) {}

  ngOnInit(): void {
    if (this.mode === 'CREATE') {
      this.userForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rol_id: ['', [Validators.required]],
        status: ['A'],
      });
    } else {
      const currentUser = this.user as IUser;
      this.userForm = this.fb.group({
        name: [currentUser.name, [Validators.required]],
        email: [currentUser.email, [Validators.required, Validators.email]],
        password: [currentUser.password, [Validators.required]],
        rol_id: [currentUser.rol_id, [Validators.required]],
        status: [currentUser.status],
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(): void {
    if (!this.userForm.valid) return;
    const formValue = this.userForm.value;

    if (this.mode === 'CREATE') {
      const { name, email, rol_id, password } = formValue;
      const roleId = Number(rol_id);

      this.userTrx
        .createUser({
          name,
          email,
          rol_id: roleId,
          password,
        })
        .subscribe({
          next: () => {
            this.activeModal.close({
              ...formValue,
              rol_id: roleId,
              created_at: new Date(),
              badge: this.utils.mappedUserBadge(roleId),
            });
          },
        });
      return;
    }
    const { name, email, rol_id, password } = formValue;
    const roleId = Number(rol_id);
    const currentUser = this.user as IUser;

    this.userTrx
      .update(currentUser.id, {
        name,
        email,
        rol_id: roleId,
        password,
      })
      .subscribe({
        next: () => {
          this.activeModal.close({
            ...formValue,
            id: this.user?.id,
            rol_id: roleId,
            created_at: this.user?.created_at,
            badge: this.utils.mappedUserBadge(roleId),
          });
        },
      });
  }
}
