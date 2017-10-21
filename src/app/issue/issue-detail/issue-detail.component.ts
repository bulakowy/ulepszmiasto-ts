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

  fixed: boolean;

  comment: string;
  commentAuthor: string;

  addCommentVisible = false;
  buttonsVisible = true;

  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  onAddComment() {
    this.comment = '';
    this.commentAuthor = '';
    this.addCommentVisible = true;
    this.buttonsVisible = false;
  }

  emptyString(str): boolean {
    return !str || /^\s*$/.test(str);
  }

  onSubmitComment() {
    this.addCommentVisible = false;
    this.buttonsVisible = true;
    if (!this.emptyString(this.comment)) {
      this.issue.comments.push({
        comment: this.comment,
        author: this.emptyString(this.commentAuthor) ? 'Anonim' : this.commentAuthor,
        date: new Date()
      });
      this.issueService.updateExisting(this.issue);
    }
  }

  onCancelComment() {
    this.addCommentVisible = false;
    this.buttonsVisible = true;
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.issueService.getIssue(this.id)
            .then(value => {
              this.issue = value;
              this.fixed = this.issue.statuses[this.issue.statuses.length - 1].status === 'Fixed';
              this.issueService.xxx.emit(this.issue);
            });
        }
      );
  }

}




