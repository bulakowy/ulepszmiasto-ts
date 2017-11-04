import { Component, OnInit, ViewChild } from '@angular/core';
import { Issue } from '../issue.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { NewIssueService } from './issue-new.service';
import { IssueRestService } from '../issue.service.rest';

@Component({
  selector: 'app-issue-new',
  templateUrl: './issue-new.component.html',
  styleUrls: ['./issue-new.component.css']
})
export class IssueNewComponent implements OnInit {

  @ViewChild('addPhoto') addPhotoInput;

  objectKeys = Object.keys;

  constructor(private newIssueService: NewIssueService,
              private issueService: IssueRestService,
              private router: Router,
              private ng2ImgToolsService: Ng2ImgToolsService) {
  }

  get issue(): Issue {
    return this.newIssueService.issue;
  }

  get submitted(): string {
    return this.newIssueService.submitted;
  }

  set submitted(s: string) {
    this.newIssueService.submitted = s;
  }

  get images(): any {
    return this.newIssueService.images;
  }

  ngOnInit() {
  }

  onCoordinatesChanged(newCoords) {
    this.issue.lng = newCoords.lng;
    this.issue.lat = newCoords.lat;
  }

  onSubmit(form: NgForm) {

    if (!this.issue.title) {
      this.submitted = 'submitted';
      return;
    }

    for (const p in this.images) {
      if (this.images.hasOwnProperty(p)) {
        this.issue.images.push({ord: p});
      }
    }

    const issueToSave = this.issue;
    const imagesToSave = this.images;

    // save issue to db
    this.issueService.storeIssue(issueToSave, imagesToSave);

    this.issueService.newIssueAdded.subscribe(
      (issue) => {
        this.router.navigate(['/issue-list/' + issue.id]);
      });

  }

  onDeleteClick(imageIndex) {
    delete this.images[imageIndex];
  }

  onChange() {
    const fileBrowser = this.addPhotoInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      const reader = new FileReader();

      reader.onload = res => {
        const target: any = res.target;

        const idx = this.newIssueService.imgCounter++;
        this.images[idx] = {url: target.result, file: fileBrowser.files[0]};

        // this.ng2ImgToolsService.compressImage(fileBrowser.files[0], 0.2).subscribe(result => {
        //   if (this.images[idx]) {
        //     this.images[idx] = {url: target.result, file: result};
        //   }
        // }, error => {
        //   console.log(error);
        // });
      };

      reader.readAsDataURL(fileBrowser.files[0]);
    }
  }
}
