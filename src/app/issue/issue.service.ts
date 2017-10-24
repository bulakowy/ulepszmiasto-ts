import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Issue } from './issue.model';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import { UUID } from 'angular2-uuid';
import * as firebase from 'firebase';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { MapComponent } from './issue-map/issue-map.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Const } from './const';

@Injectable()
export class IssueService {

  firebaseUrl = 'https://ulepszmiasto-ng.firebaseio.com/data';

  private _issuesMap = {};

  newIssueAdded = new EventEmitter<Issue>();
  issueUpdated = new EventEmitter<Issue>();
  issuesReady = new EventEmitter();

  issueDetailsLoaded = new EventEmitter<Issue>();

  constructor(private http: Http,
              private firebaseApp: FirebaseApp,
              private ng2ImgToolsService: Ng2ImgToolsService) {
    this.newIssueAdded.subscribe(
      (issue) => {
        this.issuesMap[issue.id] = issue;
      }
    );
  }

  get issuesMap() {
    return this._issuesMap;
  }

  get issues(): any[] {
    return Object.values(this._issuesMap);
  }

  storeIssue(issue: Issue, images: any[]) {
    this.http.post(this.firebaseUrl + '.json', issue)
      .subscribe(
        (result: Response) => {
          const issueId = result.json()['name'];
          issue.id = issueId;

          this.uploadImages(images, issue, 0);

          this.newIssueAdded.emit(issue);
        },
        (error) => console.log(error)
      );
  }

  updateExisting(issue: Issue) {
    this.http.put(this.firebaseUrl + '/' + issue.id + '.json', issue)
      .subscribe(
        (result) => this.issueUpdated.emit(issue),
        (error) => console.log(error)
      );
  }

  getIssues() {
    return this.http.get(this.firebaseUrl + '.json')
      .map((response: Response) => {
        const firebaseResponse = response.json();
        for (const p in firebaseResponse) {
          if (firebaseResponse.hasOwnProperty(p)) {
            const i = new Issue();
            Object.assign(i, firebaseResponse[p]);
            i.id = p;
            i['icon'] = Const.DEFAULT_ICON_URL;
            this._issuesMap[i.id] = i;
          }
        }
        return this.issues;
      });
  }

  uploadImages(images: any[], issue: Issue, idx: number) {
    for (const img of images) {
      const idxCopy = idx;
      this.storeImageInFirebase(issue, idxCopy, img.file);
      idx++;
    }
  }

  private storeImageInFirebase(issue: Issue, idx: number, result) {
    this.firebaseApp.storage().ref()
      .child('images/' + issue.id + '/' + idx)
      .put(result).then(a => {
        this.firebaseApp.database().ref()
          .child('data/' + issue.id + '/_images/' + idx)
          .update({id: idx, url: a.metadata.downloadURLs[0]});
      }
    );
  }

  getIssue(id: string): Observable<any> {

    if (this.issuesMap && this.issuesMap[id]) {
      return Observable.create((observer: Observer<Issue>) => {
        observer.next(this.issuesMap[id]);
      });
    }

    return this.http.get(this.firebaseUrl + '/' + id + '.json')
      .map((res: Response) => {
        const i = new Issue();
        Object.assign(i, res.json());
        return i;
      });
  }

}
