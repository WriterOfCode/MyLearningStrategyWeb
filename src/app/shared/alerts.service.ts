import { Injectable } from '@angular/core';
import { Alert } from './models/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  alerts: Alert[] = [];
  // Bootstrap provides styles for the following types: 'success', 'info', 'warning', 'danger', 'primary', 'secondary', 'light' and 'dark'.
  add(type: string, message: string, debug: string) {
    this.alerts.push({type, message, debug});
  }

  remove(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
