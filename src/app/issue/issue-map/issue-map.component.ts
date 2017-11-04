import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'util';
import { Const } from '../const';
import { IssueRestService } from '../issue.service.rest';

@Component({
  selector: 'app-map',
  templateUrl: './issue-map.component.html',
  styleUrls: ['./issue-map.component.css']
})
export class MapComponent implements OnInit {

  zoom = 16;
  lat = 52.22977;
  lng = 21.01178;
  properlyCentered = false;

  get issues() {
    return this.issueService.issues;
  }

  get issuesMap() {
    return this.issueService.issuesMap;
  }

  clickedIssueId;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private issueService: IssueRestService) {

  }

  ngOnInit() {
    this.issueService.issuesReady.subscribe((issuesMap) => {
      console.log(1);
      if (this.clickedIssueId) {
        console.log(2);
        this.highlightIssue(this.clickedIssueId);
      }
    });
    this.issueService.issueDetailsLoadedFromOutside.subscribe(
      (issue) => {
        this.lat = issue.lat;
        this.lng = issue.lng;
        this.properlyCentered = true;
        this.highlightIssue(issue.id);
      }
    );
    this.issueService.issueDetailsLoadedFromMap.subscribe(
      (issue) => {
        this.highlightIssue(issue.id);
      }
    );
    this.setLocation();
  }

  // onMouseOver(infoWindow, gmap) {
  //   if (gmap.lastOpen != null) {
  //     gmap.lastOpen.close();
  //   }
  //   gmap.lastOpen = infoWindow;
  //   infoWindow.open();
  // }

  onClick(gmap, issue) {
    if (gmap.lastOpen != null) {
      gmap.lastOpen.close();
    }
    if (!isUndefined(issue)) {
      this.highlightIssue(issue.id);
      this.router.navigate([issue.id, {loadedFromMap: true}], {relativeTo: this.route});
    }
  }

  highlightIssue(issueId) {
    if (this.clickedIssueId && this.issuesMap && this.issuesMap[this.clickedIssueId]) {
      this.issuesMap[this.clickedIssueId]['icon'] = Const.DEFAULT_ICON_URL;
    }
    if (this.issuesMap && this.issuesMap[issueId]) {
      this.issuesMap[issueId]['icon'] = Const.FOCUSED_ICON_URL;
    }
    this.clickedIssueId = issueId;
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
