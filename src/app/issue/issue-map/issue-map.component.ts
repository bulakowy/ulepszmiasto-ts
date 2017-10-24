import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnChanges,
  OnInit, SimpleChange, SimpleChanges, ViewChild
} from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue.service';
import { isUndefined } from 'util';
import { Const } from '../const';

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

  @Input() issues;
  issuesMap;

  clickedIssue;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private issueService: IssueService) {
    this.issueService.issueDetailsLoaded.subscribe(
      (issue) => {
        this.lat = issue.lat;
        this.lng = issue.lng;
        this.properlyCentered = true;
        this.highlightIssue(issue);
      }
    );
  }

  ngOnInit() {
    this.setLocation();
    this.issueService.issuesReady.subscribe(() => {
      this.issuesMap = {};
      for (const i of this.issues) {
        this.issuesMap[i.id] = i;
      }

      if (this.clickedIssue) {
        this.highlightIssue(this.clickedIssue);
      }
    });
  }

  onMouseOver(infoWindow, gmap) {
    if (gmap.lastOpen != null) {
      gmap.lastOpen.close();
    }
    gmap.lastOpen = infoWindow;
    infoWindow.open();
  }

  onClick(gmap, issue) {
    if (gmap.lastOpen != null) {
      gmap.lastOpen.close();
    }
    if (!isUndefined(issue)) {
      this.highlightIssue(issue);
      this.router.navigate([issue.id, {loadedFromMap: true}], {relativeTo: this.route});
    }
  }

  highlightIssue(issue) {

    if (this.clickedIssue) {
      this.clickedIssue['icon'] = Const.DEFAULT_ICON_URL;
    }
    if (this.issuesMap && this.issuesMap[issue.id]) {
      const newClicked = this.issuesMap[issue.id];
      this.clickedIssue = newClicked;
      this.clickedIssue['icon'] = Const.FOCUSED_ICON_URL;
    } else {
      this.clickedIssue = issue;
    }
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
