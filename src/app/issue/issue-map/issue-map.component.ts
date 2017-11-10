import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IssueRestService } from '../issue.rest.service';
import { MapService } from './issue-map.service';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './issue-map.component.html',
  styleUrls: ['./issue-map.component.css']
})
export class MapComponent implements OnDestroy {

  @ViewChild('gmap') gmap: AgmMap;

  constructor(private issueService: IssueRestService,
              private mapService: MapService) {
  }

  ngOnDestroy() {
    this.mapService.lat = this.gmap.latitude;
    this.mapService.lng = this.gmap.longitude;
    this.mapService.zoom = this.gmap.zoom;
  }

  onClick(gmap, issue) {
    if (gmap.lastOpen != null) {
      gmap.lastOpen.close();
    }
    if (issue) {
      this.mapService.selectedIssue = issue;
    }
  }

  get zoom() {
    return this.mapService.zoom;
  }

  get lat() {
    return this.mapService.lat;
  }

  get lng() {
    return this.mapService.lng;
  }

  get selectedIssue() {
    return this.mapService.selectedIssue;
  }

  get issues() {
    return this.issueService.issues;
  }

}
