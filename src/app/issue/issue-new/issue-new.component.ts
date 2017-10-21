import { Component, OnInit, ViewChild } from '@angular/core';
import { Issue } from '../issue.model';
import { NgForm } from '@angular/forms';
import { IssueService } from '../issue.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-issue-new',
  templateUrl: './issue-new.component.html',
  styleUrls: ['./issue-new.component.css']
})
export class IssueNewComponent implements OnInit {

  @ViewChild('addPhoto') addPhotoInput;

  categories = ['Droga', 'Sciezka rowerowa', 'Graffiti'];

  issue = new Issue();

  images = [];

  submitted;

  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private router: Router) {
    this.issue.status = 'New';
    this.issue.category = this.categories[0];
  }

  setCategory(value) {
    this.issue.category = value;
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

    this.issue.createdAt = new Date();
    this.issue.statuses.push({status: 'Open', changed: this.issue.createdAt});
    this.issue.createdBy = 'anonymous';

    let i = 0;
    for (const img of this.images) {
      this.issue.images.push({id: i});
      i++;
    }

    // save issue to db
    this.issueService.storeIssue(this.issue, this.images);

    // TODO: display Thank you msg
    this.router.navigate(['/new-issue-thank-you']);
  }

  onDeleteClick(imageIndex) {
    this.images.splice(imageIndex, 1);
  }

  onChange(event) {
    const fileBrowser = this.addPhotoInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const reader = new FileReader();

      reader.onload = ee => {
        const target: any = ee.target;
        this.images.push({url: target.result, file: fileBrowser.files[0]});
      };

      reader.readAsDataURL(fileBrowser.files[0]);
    }
  }
}
