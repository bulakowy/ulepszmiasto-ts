import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue.model';
import { NgForm } from '@angular/forms';
import { IssueService } from '../issue.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-issue-new',
  templateUrl: './issue-new.component.html',
  styleUrls: ['./issue-new.component.css']
})
export class IssueNewComponent implements OnInit {

  categories = ['Droga', 'Sciezka rowerowa', 'Graffiti'];

  issue = new Issue();

  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private router: Router) {
    this.issue.status = 'New';
    this.issue.category = this.categories[0];
  }

  setCategory(value) {
    this.issue.category = value;
  }

  ngOnInit() {
  }

  onCoordinatesChanged(newCoords) {
    this.issue.lng = newCoords.lng;
    this.issue.lat = newCoords.lat;
  }

  onSubmit(form: NgForm) {
    this.issue.createdAt = new Date();
    this.issue.lastUpdatedAt = this.issue.createdAt;
    this.issue.createdBy = 'anonymous';

    // save issue to db
    this.issueService.storeIssue(this.issue);

    // TODO: display Thank you msg
    this.router.navigate(['/']);
  }

}
