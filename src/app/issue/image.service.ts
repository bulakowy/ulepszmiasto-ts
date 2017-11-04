import { EventEmitter, Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import 'rxjs/Rx';
import { CountDownLatch } from '../utils/CountDownLatch';

@Injectable()
export class ImageService {

  constructor(private firebaseApp: FirebaseApp,
              private ng2ImgToolsService: Ng2ImgToolsService) {
  }

  uploadImageToFirebase(issueId: string, idx: number, img: any) {
    return this.firebaseApp.storage().ref().child('images/' + issueId + '/' + idx).put(img);
  }

}
