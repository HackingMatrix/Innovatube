import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required], // username o email
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { identifier, password } = this.loginForm.value;

    this.authService.login({ identifier, password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.user.username);
        this.authService.setLoggedInState();
        this.router.navigate([this.returnUrl]); // 🔁 volvemos a la ruta original
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}

