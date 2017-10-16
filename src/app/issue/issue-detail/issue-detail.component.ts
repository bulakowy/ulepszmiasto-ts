import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IssueService } from '../issue.service';
import { MapComponent } from '../issue-map/issue-map.component';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  issue: Issue;
  id: string;

  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.issueService.getIssue(this.id)
            .then(value => {
              this.issue = value;
              this.issueService.xxx.emit(this.issue);
            });
        }
      );
  }

}
