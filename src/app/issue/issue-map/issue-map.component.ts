import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../issue.model';

@Component({
  selector: 'app-map',
  templateUrl: './issue-map.component.html',
  styleUrls: ['./issue-map.component.css']
})
export class MapComponent implements OnInit {

  zoom = 16;
  lat = 52.22977;
  lng = 21.01178;
  @Input() issues;

  constructor() {
  }

  ngOnInit() {
    this.setLocation();
  }

  onMouseOver(infoWindow, gmap) {
    if (gmap.lastOpen != null) {
      gmap.lastOpen.close();
    }
    gmap.lastOpen = infoWindow;
    infoWindow.open();
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

}
