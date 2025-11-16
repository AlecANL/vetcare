import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const values = this.form.value;
    this.authService
      .login({
        ...values,
      })
      .subscribe({
        next: (user) => {
          localStorage.setItem('user', JSON.stringify(user.user));
          this.router.navigate(['/home']).finally(() => {});
        },
        error: () => {
          alert('usuario o contraseña incorrectos');
        },
      });
  }
}
