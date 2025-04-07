import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  loggedIn = false;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(isLogged => {
      this.loggedIn = isLogged;
      this.username = isLogged ? localStorage.getItem('username') : null;
    });
  }

  logout() {
    this.authService.logout();
  }
}
