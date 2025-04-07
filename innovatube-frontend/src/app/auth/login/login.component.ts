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
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private route: ActivatedRoute,
 
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required], // username o email
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Completa todos los campos.';
      return;
    }
  
    const identifier = this.loginForm.value.identifier.trim();
    const password = this.loginForm.value.password.trim();
  
    this.authService.login({ identifier, password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.user.username);
        this.authService.setLoggedInState();

      this.router.navigate(['/search']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Usuario o contraseña incorrectos.';
        this.loginForm.reset();
      }
    });
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  
}

