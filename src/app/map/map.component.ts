import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue/issue.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'My first AGM project';
  lat = 52.223143;
  lng = 21.036106;

  issues: Issue[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.issues.push(Issue.randomIssue());
    }
  }

  ngOnInit() {
  }

}
