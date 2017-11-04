import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Issue } from './issue.model';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Const } from './const';
import { CountDownLatch } from '../utils/CountDownLatch';
import { ImageService } from './image.service';
import { IssueService } from './issue.service';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class IssueFirebaseService implements IssueService {

  firebaseUrl = 'https://ulepszmiasto-ng.firebaseio.com/data';

  private _issuesMap = {};

  newIssueAdded = new EventEmitter<Issue>();
  issueUpdated = new EventEmitter<Issue>();
  issuesReady = new EventEmitter<any>();
  issueDetailsLoadedFromOutside = new EventEmitter<Issue>();
  issueDetailsLoadedFromMap = new EventEmitter<Issue>();

  constructor(private http: Http,
              private firebaseApp: FirebaseApp,
              private imageService: ImageService) {
    this.newIssueAdded.subscribe(
      (issue) => {
        this._issuesMap[issue.id] = issue;
      });
  }

  get issuesMap(): any {
    return this._issuesMap;
  }

  get issues(): any[] {
    return Object.values(this._issuesMap);
  }

  storeIssue(issue: Issue, images: any) {

    const imagesCount = Object.keys(images).length;

    const latch = new CountDownLatch(imagesCount + 1, this.newIssueAdded, issue);

    this.http.post(this.firebaseUrl + '.json', issue)
      .subscribe(
        (result: Response) => {
          const issueId = result.json()['name'];
          issue.id = issueId;

          if (imagesCount > 0) {
            this.uploadImages(images, issueId, latch);

          }
          latch.countDown();
        },
        (error) => console.log(error)
      );
  }

  private uploadImages(images: any, issueId: any, latch: CountDownLatch) {
    let idx = 0;
    for (const key in images) {
      if (images.hasOwnProperty(key)) {
        const idxCopy = idx;

        this.imageService.uploadImageToFirebase(issueId, idxCopy, images[key].file)
          .then(res => {
              this.firebaseApp.database().ref().child('data/' + issueId + '/_images/' + idxCopy)
                .update({id: idxCopy, url: res.metadata.downloadURLs[0]})
                .then(value => {
                  latch.countDown();
                });
            }
          );
        idx++;
      }
    }
  }

  updateExisting(issue: Issue) {
    this.http.put(this.firebaseUrl + '/' + issue.id + '.json', issue)
      .subscribe(
        (result) => this.issueUpdated.emit(issue),
        (error) => console.log(error)
      );
  }

  getIssues(): any {
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
        return this._issuesMap;
      });
  }

  getIssue(id: string): Observable<any> {

    if (this._issuesMap && this._issuesMap[id]
    ) {
      return Observable.create((observer: Observer<Issue>) => {
        observer.next(this._issuesMap[id]);
      });
    }

    return this.http.get(this.firebaseUrl + '/' + id + '.json')
      .map((res: Response) => {
        const i = new Issue();
        Object.assign(i, res.json());
        i.id = id;
        return i;
      });
  }

}
