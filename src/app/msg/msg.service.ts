import { Injectable } from '@angular/core';

@Injectable()
export class MsgService {

  private _msg: string;

  get msg(): string {
    return this._msg;
  }

  set msg(m: string) {
    this._msg = m;
    setInterval(() => this._msg = '', 10000);
  }
}
