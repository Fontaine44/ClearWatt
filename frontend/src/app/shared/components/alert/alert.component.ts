import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Alert, AlertService } from '@shared/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AlertComponent {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {
    this.alertService.alerts$.subscribe(alerts => {
      this.alerts = alerts;
      // Automatically remove each alert after 3 seconds
      alerts.forEach(alert => {
        setTimeout(() => this.removeAlert(alert), 3000);
      });
    });
  }

  removeAlert(alert: Alert) {
    this.alertService.removeAlert(alert);
  }
}
