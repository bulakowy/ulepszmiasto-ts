import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnChanges,
  OnInit, SimpleChange, SimpleChanges, ViewChild
} from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue.service';

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
  @Input() issues;

  clickedIssue;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private issueService: IssueService) {
    this.issueService.xxx.subscribe(
      (issue) => {
        this.onClick(issue);
      }
    );
  }

  ngOnInit() {
    console.log(this.clickedIssue);
    this.setLocation();
  }

  onMouseOver(infoWindow, gmap) {
    if (gmap.lastOpen != null) {
      gmap.lastOpen.close();
    }
    gmap.lastOpen = infoWindow;
    infoWindow.open();
  }

  onClick(issue) {
    if (this.clickedIssue) {
      this.clickedIssue['icon'] = MapComponent.defaultIconUrl;
    }
    for (const i of this.issues) {
      if (i.id === issue.id) {
        this.clickedIssue = i;
        this.clickedIssue['icon'] = MapComponent.focusedIconUrl;
      }
    }
    this.router.navigate([issue.id], {relativeTo: this.route});
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        },
        (error) => console.log(error)
      );
    } else {
      console.log('geolocation not supported');
    }
  }

}
