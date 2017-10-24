import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../issue.service';
import { Response } from '@angular/http';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';
import { MapComponent } from '../issue-map/issue-map.component';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  get issues() {
    return this.issueService.issues;
  }

  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.issueService.getIssues().subscribe(
      (issuesMap) => {
        this.issueService.issuesReady.emit();
      },
      (error) => console.log(error)
    );
  }

}
