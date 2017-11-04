import { Utils } from '../utils/Utils';

export class Issue {

  id: string;
  lng: number;
  lat: number;
  title: string;
  desc: string;
  createdBy: string;
  createdDate: number;

  statuses: { status: string, createdDate: number }[] = [];

  images: any[] = [];

  comments: { comment: string, author: string, createdDate: number }[] = [];

  constructor() {
  }

  getCreatedDateAsDate(): Date {
    return new Date(this.createdDate * 1000);
  }

}
