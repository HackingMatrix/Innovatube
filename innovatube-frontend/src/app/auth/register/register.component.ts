import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, RecaptchaModule, RecaptchaFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  captchaToken: string | null = null;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor llena todos los campos correctamente';
      return;
    }

    const { fullName, username, email, password } = this.registerForm.value;

    this.authService.register({ fullName, username, email, password, recaptchaToken: this.captchaToken })
  .subscribe({
    next: (res) => {
      this.successMessage = 'Registro exitoso ✅ Redirigiendo al login...';
      this.errorMessage = '';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Error en el registro';
      this.successMessage = '';
    }
  });
}

onCaptchaResolved(token: string | null) {
  console.log('Token del captcha resuelto:', token);
  if (token) {
    this.captchaToken = token;
  }
}


}
