import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnChanges,
  OnInit, SimpleChange, SimpleChanges, ViewChild
} from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-map',
  templateUrl: './issue-map.component.html',
  styleUrls: ['./issue-map.component.css']
})
export class MapComponent implements OnInit {

  static defaultIconUrl = 'assets/img/default-marker.png';
  static focusedIconUrl = 'assets/img/clicked-marker.png';

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
        console.log('issueDetailsLoaded');
        this.lat = issue.lat;
        this.lng = issue.lng;
        this.properlyCentered = true;
        console.log('highlight from hell');
        this.highlightIssue(issue);
      }
    );
  }

  ngOnInit() {
    this.setLocation();
    this.issueService.issuesReady.subscribe(() => {
      console.log('issues ready');
      this.issuesMap = {};
      for (const i of this.issues) {
        this.issuesMap[i.id] = i;
      }

      console.log('issues ready : this.clickedIssue = ' + this.clickedIssue);
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

    console.log('IIIIIIIIIIIIisue: ' + issue);

    if (this.clickedIssue) {
      this.clickedIssue['icon'] = MapComponent.defaultIconUrl;
    }
    console.log('issueMap : ' + this.issuesMap);
    if (this.issuesMap && this.issuesMap[issue.id]) {
      console.log('highlightIssue');
      console.log('issue : ' + issue.id);
      const newClicked = this.issuesMap[issue.id];
      this.clickedIssue = newClicked;
      this.clickedIssue['icon'] = MapComponent.focusedIconUrl;
    } else {
      this.clickedIssue = issue;
    }
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('getCurrentPosition');
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
