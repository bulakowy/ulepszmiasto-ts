import { Issue } from './issue.model';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

export interface IssueService {

  storeIssue(issue: Issue, images: any);

  updateExisting(issue: Issue);

  getIssues(): any;

  getIssue(id: string): Observable<any>;
}
