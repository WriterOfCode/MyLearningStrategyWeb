import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../shared/alerts.service';
import { Alert } from '../shared/models/Alert';

@Component({
  selector: 'mls-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  public alertsService: AlertsService;
  constructor(alertsServ: AlertsService) {  this.alertsService = alertsServ; }

  ngOnInit() {
  }

  close(alert: Alert) {
    this.alertsService.remove(alert);
  }

}
// https://www.loggly.com/blog/angular-exception-logging-made-simple/
