import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Issue } from '../issue.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { NewIssueService } from './issue-new.service';
import { IssueRestService } from '../issue.rest.service';
import { IssueNewMapComponent } from './issue-new-map/issue-new-map.component';

@Component({
  selector: 'app-issue-new',
  templateUrl: './issue-new.component.html',
  styleUrls: ['./issue-new.component.css']
})
export class IssueNewComponent {

  @ViewChild('addPhoto') addPhotoInput;
  @ViewChild('map') map: IssueNewMapComponent;

  constructor(private newIssueService: NewIssueService,
              private issueService: IssueRestService,
              private router: Router) {
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

  onSubmit(form: NgForm) {

    if (!this.issue.title) {
      this.submitted = 'submitted';
      return;
    }

    this.issue.lng = this.map.gmap.longitude;
    this.issue.lat = this.map.gmap.latitude;

    const issueToSave = this.issue;
    const imagesToSave = this.images;

    // save issue to db
    this.issueService.storeIssue(issueToSave, imagesToSave);

    this.issueService.newIssueAdded.subscribe(
      (issue) => {
        this.router.navigate(['/issue-list/' + issue.id, {loadedFromMap: false, newIssue: true}]);
      });
  }

  onDeleteClick(imageIndex) {
    this.images.splice(imageIndex, 1);
  }

  onChange() {
    const fileBrowser = this.addPhotoInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      const reader = new FileReader();

      reader.onload = res => {
        const target: any = res.target;

        this.images.push({url: target.result, file: fileBrowser.files[0]});
      };

      reader.readAsDataURL(fileBrowser.files[0]);
    }
  }
}
