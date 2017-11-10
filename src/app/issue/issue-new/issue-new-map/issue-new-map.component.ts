import { Component, EventEmitter, AfterViewInit, OnInit, Output, Input, ViewChild, OnDestroy } from '@angular/core';
import { NewIssueService } from '../issue-new.service';
import { AgmMap } from '@agm/core';

declare var $: any;

@Component({
  selector: 'app-issue-new-map',
  templateUrl: './issue-new-map.component.html',
  styleUrls: ['./issue-new-map.component.css']
})
export class IssueNewMapComponent implements OnDestroy {

  @ViewChild('gmap') gmap: AgmMap;

  constructor(private newIssueService: NewIssueService) {
  }

  ngOnDestroy() {
    this.newIssueService.lat = this.gmap.latitude;
    this.newIssueService.lng = this.gmap.longitude;
    this.newIssueService.zoom = this.gmap.zoom;
  }

  get lat() {
    return this.newIssueService.lat;
  }

  get lng() {
    return this.newIssueService.lng;
  }

  get zoom() {
    return this.newIssueService.zoom;
  }

}

