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

@Injectable()
export class IssueCache {

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

  }

  get issuesMap(): any {
    return this._issuesMap;
  }

  get issues(): any[] {
    return Object.values(this._issuesMap);
  }

}
