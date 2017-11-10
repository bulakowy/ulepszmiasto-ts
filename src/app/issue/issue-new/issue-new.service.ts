import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Issue } from '../issue.model';
import { IssueRestService } from '../issue.rest.service';

@Injectable()
export class NewIssueService {

  issue: Issue = new Issue();
  images = [];
  submitted = '';

  lat = 52.2297700;
  lng = 21.0117800;
  zoom = 16;

  constructor(private issueService: IssueRestService) {
    this.issueService.newIssueAdded.subscribe(
      (issue) => {
        this.reset();
      }
    );
    this.setLocation();
  }

  reset() {
    this.issue = new Issue();
    this.images = [];
    this.submitted = '';
    this.zoom = 16;
    this.setLocation();
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
}
