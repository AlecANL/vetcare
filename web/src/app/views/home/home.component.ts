import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') ?? '');
  }

  logOut() {
    this.router.navigate(['']);
    localStorage.clear();
  }
}
