import { Component, OnInit } from '@angular/core';
import { IssueBuilder } from '../issue.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-issue-new',
  templateUrl: './issue-new.component.html',
  styleUrls: ['./issue-new.component.css']
})
export class IssueNewComponent implements OnInit {

  categories = ['Droga', 'Sciezka rowerowa', 'Graffiti'];

  issueBuilder = new IssueBuilder();

  constructor() {
    this.issueBuilder.status = 'New';
    this.issueBuilder.category = this.categories[0];
  }

  setCategory(value) {
    this.issueBuilder.category = value;
  }

  ngOnInit() {
  }

  onCoordinatesChanged(newCoords) {
    this.issueBuilder.lng = newCoords.lng;
    this.issueBuilder.lat = newCoords.lat;
  }

  onSubmit(form: NgForm) {
    this.issueBuilder.createdAt = new Date();
    this.issueBuilder.lastUpdatedAt = this.issueBuilder.createdAt;
    this.issueBuilder.createdBy = 'anonymous';
    const issue = this.issueBuilder.build();
    console.log(form);
    console.log(issue);
    // save issue to db
    // redirect to Thank you for submitting page
  }

}
