import { Component, EventEmitter, AfterViewInit, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-issue-new-map',
  templateUrl: './issue-new-map.component.html',
  styleUrls: ['./issue-new-map.component.css']
})
export class IssueNewMapComponent implements OnInit, AfterViewInit {

  @Input() lat = 52.2297700;
  @Input() lng = 21.0117800;
  defaultZoom = 17;

  @Output() coordinatesChanged = new EventEmitter<{ lat: number, lng: number }>();

  marker = {
    lat: this.lat,
    lng: this.lng,
    draggable: true
  };

  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.marker.lat = this.lat;
        this.marker.lng = this.lng;
      });
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.emitCoordinatesChanged();
  }

  onCenterChange($event) {
    this.marker.lat = $event.lat;
    this.marker.lng = $event.lng;
    this.emitCoordinatesChanged();
  }

  mapClicked($event) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
    this.emitCoordinatesChanged();
  }

  emitCoordinatesChanged() {
    this.coordinatesChanged.emit({lat: this.marker.lat, lng: this.marker.lng});
  }

}

