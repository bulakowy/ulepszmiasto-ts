import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IssueRestService } from '../issue.service.rest';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  issue: Issue;
  id: string;

  currentStatus: string;

  comment: string;
  commentAuthor: string;

  constructor(private issueService: IssueRestService,
              private route: ActivatedRoute) {
  }

  emptyString(str): boolean {
    return !str || /^\s*$/.test(str);
  }

  onSubmitComment() {
    if (!this.emptyString(this.comment)) {
      this.issue.comments.push({
        comment: this.comment,
        author: this.emptyString(this.commentAuthor) ? 'Anonim' : this.commentAuthor,
        createdDate: new Date().getUTCSeconds()
      });
      this.issueService.updateExisting(this.issue);
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          const loadedFromMap = params['loadedFromMap'];
          this.issueService.getIssue(this.id).subscribe(value => {
            this.issue = value;
            this.currentStatus = this.issue.statuses[this.issue.statuses.length - 1].status;
            if (loadedFromMap) {
              this.issueService.issueDetailsLoadedFromMap.emit(value);
            } else {
              this.issueService.issueDetailsLoadedFromOutside.emit(value);
            }
          });
        }
      );
  }

}




