import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Issue } from '../issue.model';
import { IssueRestService } from '../issue.service.rest';

@Injectable()
export class NewIssueService {

  issue: Issue = new Issue();
  images = {};
  imgCounter = 0;
  submitted = '';

  constructor(private issueService: IssueRestService) {
    this.issueService.newIssueAdded.subscribe(
      (issue) => {
        this.reset();
      }
    );
  }

  reset() {
    this.issue = new Issue();
    this.images = {};
    this.imgCounter = 0;
    this.submitted = '';
  }
}
