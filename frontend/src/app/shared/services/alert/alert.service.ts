import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export interface Alert {
  type: AlertType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertsSubject.asObservable();

  constructor() { }

  success(message: string) {
    this.addAlert('success', message);
  }

  danger(message: string) {
    this.addAlert('danger', message);
  }

  warning(message: string) {
    this.addAlert('warning', message);
  }

  info(message: string) {
    this.addAlert('info', message);
  }

  // Add an alert
  addAlert(type: AlertType, message: string) {
    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, { type, message }]);
  }

  // Remove a specific alert (by message)
  removeAlert(alertToRemove: Alert) {
    const currentAlerts = this.alertsSubject.value.filter(alert => alert !== alertToRemove);
    this.alertsSubject.next(currentAlerts);
  }

  // Clear all alerts
  clearAlerts() {
    this.alertsSubject.next([]);
  }
}
