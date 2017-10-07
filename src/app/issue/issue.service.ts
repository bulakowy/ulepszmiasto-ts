import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Issue } from './issue.model';

@Injectable()
export class IssueService {

  url = 'https://ulepszmiasto-ng.firebaseio.com/data';

  newIssueAdded = new EventEmitter<Issue>();
  issueUpdated = new EventEmitter<Issue>();

  constructor(private http: Http) {
  }

  storeIssue(issue: Issue) {
    if (issue.id) {
      this.http.put(this.url + issue.id + '.json', issue)
        .subscribe(
          (result) => this.issueUpdated.emit(issue),
          (error) => console.log(error)
        );
    }


    this.http.post(this.url + '.json', issue)
      .subscribe(
        (result) => {
          this.newIssueAdded.emit(issue);
        },
        (error) => console.log(error)
      );
  }

  getIssues() {
    return this.http.get(this.url + '.json');
  }

}
