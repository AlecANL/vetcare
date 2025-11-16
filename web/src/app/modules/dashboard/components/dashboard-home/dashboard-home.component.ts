import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  stats: Array<any> = [];
  incommingAppointments: Array<any> = [];
  products: Array<any> = [];

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.stats = this.activatedRoute.snapshot.data['getStats'] || [];
    this.incommingAppointments =
      this.activatedRoute.snapshot.data['getIncommingAppointments'] || [];
    this.products = this.activatedRoute.snapshot.data['getProducts'] || [];
  }
}
