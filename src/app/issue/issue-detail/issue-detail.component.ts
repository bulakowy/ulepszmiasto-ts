import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue.model';
import { ActivatedRoute, Params } from '@angular/router';
import { IssueRestService } from '../issue.rest.service';
import { MapService } from '../issue-map/issue-map.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  get issue() {
    return this.mapService.selectedIssue;
  }

  set issue(i: Issue) {
    this.mapService.selectedIssue = i;
  }

  currentStatus: string;

  comment: string;
  commentAuthor: string;

  constructor(private issueService: IssueRestService,
              private mapService: MapService,
              private route: ActivatedRoute) {
  }

  emptyString(str): boolean {
    return !str || /^\s*$/.test(str);
  }

  onSubmitComment() {
    if (!this.emptyString(this.comment)) {
      const newComment = {
        comment: this.comment,
        createdBy: this.emptyString(this.commentAuthor) ? 'Anonim' : this.commentAuthor,
        createdDate: new Date().getTime() / 1000
      };
      this.issue.comments.push(newComment);
      this.issueService.addComment(this.issue.id, newComment);
      this.comment = '';
      this.commentAuthor = '';
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {

          const id = params['id'];

          if (id) {
            this.issueService.getIssue(id).subscribe(value => {
              this.issue = value;
              this.currentStatus = this.issue.statuses[this.issue.statuses.length - 1].status;
              this.mapService.selectIssueAndCenter(this.issue);
            });
          }
        }
      );
  }

}




