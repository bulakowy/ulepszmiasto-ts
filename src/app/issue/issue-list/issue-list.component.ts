import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue.service';
import { Response } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';
import { MapComponent } from '../issue-map/issue-map.component';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];

  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private router: Router) {
    this.issueService.newIssueAdded.subscribe(
      (issue) => {
        this.issues.push(issue);
      }
    );
  }

  bla() {
    throw new Error('xyz');
  }

  ngOnInit() {
    this.issueService.getIssues().subscribe(
      (response) => this.parseResponse(response),
      (error) => console.log(error)
    );
  }

  private parseResponse(response: Response) {
    const firebaseResponse = JSON.parse(response.text());
    for (const p in firebaseResponse) {
      if (firebaseResponse.hasOwnProperty(p)) {
        const i = new Issue();
        Object.assign(i, firebaseResponse[p]);
        i.id = p;
        i['icon'] = MapComponent.defaultIconUrl;
        this.issues.push(i);
      }
    }
  }

}
