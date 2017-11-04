import { EventEmitter } from '@angular/core';

export class CountDownLatch {

  private _counter: number;

  constructor(counter: number,
              private eventEmmiter: EventEmitter<any>,
              private objectToEmit: any) {
    this._counter = counter;
  }

  countDown() {
    this._counter--;
    if (this._counter === 0) {
      this.eventEmmiter.emit(this.objectToEmit);
    }
  }
}
