import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue.service';
import { Response } from '@angular/http';

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
        console.log("newIssueAdded caught!!!");
        this.issues.push(issue);
      }
    );
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
        this.issues.push(i);
      }
    }
  }

  onNewIssue() {
    this.router.navigate(['/new-issue']);
  }

}
