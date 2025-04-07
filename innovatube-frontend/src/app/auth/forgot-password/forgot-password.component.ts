import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;
    const email = this.forgotForm.value.email;
    this.authService.forgotPassword({ email }).subscribe({
      next: () => {
        this.message = 'Se ha enviado un enlace de recuperación a tu correo.';
      },
      error: (err) => {
        this.message = err.error?.message || 'Error al enviar el enlace de recuperación.';
      }
    });
  }
}
