import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { UserProfilesService } from '../shared/services/user-profiles.service';
import { AlertsService } from '../shared/alerts.service';
import { IUserProfile } from '../shared/models/user-profile';
import { HttpClient } from '@angular/common/http';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'mls-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  private user: any;
  userData: IUserProfile;
  profile;

  constructor(private authService: MsalService,
              private alertsService: AlertsService,
              private http: HttpClient,
              private userProfilesService: UserProfilesService) {
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .toPromise().then(profile => {
        this.profile = profile;
      });
  }

}
