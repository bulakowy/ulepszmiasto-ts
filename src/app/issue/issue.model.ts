import { Utils } from '../utils/Utils';

export class Issue {

  lng: number;
  lat: number;
  category: string;
  title: string;
  desc: string;
  status: string;
  createdBy: string;
  createdAt: any;
  lastUpdatedAt: any;

  constructor(issueBuilder: IssueBuilder) {
    this.lng = issueBuilder.lng;
    this.lat = issueBuilder.lat;
    this.category = issueBuilder.category;
    this.title = issueBuilder.title;
    this.desc = issueBuilder.desc;
    this.status = issueBuilder.status;
    this.createdBy = issueBuilder.createdBy;
    this.createdAt = issueBuilder.createdAt;
    this.lastUpdatedAt = issueBuilder.lastUpdatedAt;
  }

  static randomCategory() {
    return Utils.randomElement(['road', 'sidewalk', 'graffiti']);
  }

  static randomStatus() {
    return Utils.randomElement(['new', 'fixed']);
  }

  static randomIssue() {
    const builder = new IssueBuilder();
    builder.lng = 20.987816 + (Math.random() / 20);
    builder.lat = 52.209371 + (Math.random() / 20);
    builder.category = Issue.randomCategory();
    builder.title = Utils.randomString(10, true, false);
    builder.desc = Utils.randomString(50, true, true);
    builder.status = Issue.randomStatus();
    builder.createdBy = Utils.randomString(10, false, false);
    builder.createdAt = new Date();
    builder.lastUpdatedAt = new Date();

    return new Issue(builder);
  }
}

export class IssueBuilder {

  private _lng: number;
  private _lat: number;
  private _category: any;
  private _title: string;
  private _desc: string;
  private _status: string;
  private _createdBy: string;
  private _createdAt: any;
  private _lastUpdatedAt: any;

  constructor() {
  }

  build() {
    return new Issue(this);
  }

  get lng(): number {
    return this._lng;
  }

  set lng(value: number) {
    this._lng = value;
  }

  get lat(): number {
    return this._lat;
  }

  set lat(value: number) {
    this._lat = value;
  }

  get category(): any {
    return this._category;
  }

  set category(value: any) {
    this._category = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get desc(): string {
    return this._desc;
  }

  set desc(value: string) {
    this._desc = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get createdAt(): any {
    return this._createdAt;
  }

  set createdAt(value: any) {
    this._createdAt = value;
  }

  get lastUpdatedAt(): any {
    return this._lastUpdatedAt;
  }

  set lastUpdatedAt(value: any) {
    this._lastUpdatedAt = value;
  }
}
