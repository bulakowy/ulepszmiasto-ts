import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Issue } from './issue.model';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import { UUID } from 'angular2-uuid';
import * as firebase from 'firebase';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import { Ng2ImgToolsService } from 'ng2-img-tools';

@Injectable()
export class IssueService {

  firebaseUrl = 'https://ulepszmiasto-ng.firebaseio.com/data';

  newIssueAdded = new EventEmitter<Issue>();
  issueUpdated = new EventEmitter<Issue>();
  issuesReady = new EventEmitter();

  issueDetailsLoaded = new EventEmitter<Issue>();

  constructor(private http: Http,
              private firebaseApp: FirebaseApp,
              private ng2ImgToolsService: Ng2ImgToolsService) {
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
    return this.http.get(this.firebaseUrl + '.json');
  }

  uploadImages(images: any[], issue: Issue, idx: number) {
    for (const img of images) {

      const idxCopy = idx;
      this.ng2ImgToolsService.compress([img.file], 0.1).subscribe(result => {
        this.storeImageInFirebase(issue, idxCopy, result);
      }, error => {
        console.log(error);
        this.storeImageInFirebase(issue, idxCopy, img.file);
      });

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
        console.log('img uploaded');
      }
    );
  }

  getIssue(id: string): Promise<Issue> {

    const promise = new Promise<Issue>((resolve, reject) => {

      this.http.get(this.firebaseUrl + '/' + id + '.json')
        .toPromise()
        .then(
          res => { // Success
            const issue = new Issue();
            issue.id = id;
            this.parseResponse(issue, res);
            resolve(issue);
          }
        ).catch(reason => console.log(reason));
    });

    return promise;
  }

  parseResponse(issue: Issue, response: Response) {
    const firebaseResponse = JSON.parse(response.text());

    for (const p in firebaseResponse) {
      if (firebaseResponse.hasOwnProperty(p)) {
        issue[p] = firebaseResponse[p];
      }
    }
  }

}
