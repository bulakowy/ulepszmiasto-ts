import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router) {
    for (let i = 0; i < 10; i++) {
      this.issues.push(Issue.randomIssue());
    }
  }

  ngOnInit() {
  }

  onNewIssue() {
    this.router.navigate(['/new-issue']);
  }

}
