import { Injectable } from '@angular/core';
import { Issue } from '../issue.model';
import { IssueRestService } from '../issue.rest.service';
import * as _ from 'lodash';

@Injectable()
export class MapService {

  zoom = 16;
  lat = 52.22977;
  lng = 21.01178;

  properlyCentered = false;
  selectedIssue;

  constructor(private issueService: IssueRestService) {
    this.setLocation();

    this.issueService.getIssues().subscribe(
      (issuesMap) => {
        if (!this.selectedIssue) {
          this.selectIssueAndCenter(issuesMap[_.last(_.keys(issuesMap))]);
        }
      },
      (error) => console.log(error)
    );
  }

  selectIssueAndCenter(issue: Issue) {
    this.selectedIssue = issue;
    this.lat = issue.lat;
    this.lng = issue.lng;
    this.properlyCentered = true;
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!this.properlyCentered) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          }
        },
        (error) => console.log(error)
      );
    } else {
      console.log('geolocation not supported');
    }
  }
}
