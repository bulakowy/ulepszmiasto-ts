import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStartComponent } from './issue-start.component';

describe('IssueStartComponent', () => {
  let component: IssueStartComponent;
  let fixture: ComponentFixture<IssueStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
