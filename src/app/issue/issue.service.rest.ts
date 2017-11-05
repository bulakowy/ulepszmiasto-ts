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

@Injectable()
export class IssueRestService implements IssueService {

  private _serviceUrl = 'http://localhost:8080/issues';

  private _issuesMap = {};

  msg = '';

  newIssueAdded = new EventEmitter<Issue>();
  issueUpdated = new EventEmitter<Issue>();
  issuesReady = new EventEmitter<any>();
  issueDetailsLoadedFromOutside = new EventEmitter<Issue>();
  issueDetailsLoadedFromMap = new EventEmitter<Issue>();

  private _newIssueStored = new EventEmitter<Issue>();

  constructor(private http: Http,
              private imageService: ImageService) {
    this._newIssueStored.subscribe(
      (issue) => {
        this.getIssue(issue.id).subscribe(newIssue => {
          this._issuesMap[issue.id] = newIssue;
          this.msg = 'Dziękujemy! Twoje zgłoszenie zostało dodane.';
          setTimeout(() => {
            this.msg = '';
          }, 10000);

          this.newIssueAdded.emit(newIssue);
        });
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

    const latch = new CountDownLatch(imagesCount + 1, this._newIssueStored, issue);

    this.http.post(this._serviceUrl, issue)
      .subscribe(
        (result: Response) => {
          issue.id = result.json()['id'];
          if (imagesCount > 0) {
            this.uploadImages(images, issue.id, latch);
          }
          latch.countDown();
        },
        (error) => console.log(error)
      );
  }

  uploadImages(images: any, issueId: string, latch: CountDownLatch) {

    let ord = 1;

    for (const key in images) {
      if (images.hasOwnProperty(key)) {
        const ordCopy = ord;
        this.imageService.uploadImageToFirebase(issueId, ordCopy, images[key].file)
          .then(res => {
            console.log(res.downloadURL);
            this.http.post(this._serviceUrl + '/' + issueId + '/images', res.downloadURL)
              .subscribe(
                (result: Response) => {
                  latch.countDown();
                },
                (error) => {
                  console.log(error);
                  latch.countDown();
                }
              );
          });
        ord++;
      }
    }
  }

  updateExisting(issue: Issue) {
    this.http.put(this._serviceUrl + '/' + issue.id, issue)
      .subscribe(
        (result) => this.issueUpdated.emit(issue),
        (error) => console.log(error)
      );
  }

  getIssues(): any {
    return this.http.get(this._serviceUrl)
      .map((response: Response) => {
        const json = response.json();
        for (const p in json) {
          if (json.hasOwnProperty(p)) {
            const i = new Issue();
            Object.assign(i, json[p]);
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

    return this.http.get(this._serviceUrl + '/' + id)
      .map((res: Response) => {
        const i = new Issue();
        Object.assign(i, res.json());
        i.id = id;
        return i;
      });
  }

  addComment(issueId: string, comment: any) {
    this.http.post(this._serviceUrl + '/' + issueId + '/comments/', comment)
      .subscribe(
        (result: Response) => {
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
