import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue-info',
  templateUrl: './issue-info.component.html',
  styleUrls: ['./issue-info.component.css']
})
export class IssueInfoComponent implements OnInit {

  @Input() msg: string;

  constructor() { }

  ngOnInit() {
  }

}
