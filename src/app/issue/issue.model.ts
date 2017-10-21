import { Utils } from '../utils/Utils';

export class Issue {

  private _id: string;
  private _lng: number;
  private _lat: number;
  private _category: string;
  private _title: string;
  private _desc: string;
  private _status: string;
  private _createdBy: string;
  private _createdAt: any;

  private _statuses: { status: string, changed: string }[] = [];

  private _images: any[] = [];

  private _comments: { comment: string, author: string, date: string }[] = [];

  constructor() {
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
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

  get category(): string {
    return this._category;
  }

  set category(value: string) {
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

  get statuses(): { status: string; changed: string }[] {
    return this._statuses;
  }

  get images(): any[] {
    return this._images;
  }

  get comments(): { comment: string; author: string; date: any }[] {
    return this._comments;
  }

}
