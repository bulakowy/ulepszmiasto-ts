import { Component, OnInit } from '@angular/core';
import { IssueRestService } from '../issue.service.rest';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  constructor(private issueService: IssueRestService) {
  }

  ngOnInit() {
    this.issueService.getIssues().subscribe(
      (issuesMap) => {
        this.issueService.issuesReady.emit(issuesMap);
      },
      (error) => console.log(error)
    );
  }

}
