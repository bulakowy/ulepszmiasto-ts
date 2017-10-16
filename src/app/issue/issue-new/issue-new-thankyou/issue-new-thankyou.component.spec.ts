import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueNewThankyouComponent } from './issue-new-thankyou.component';

describe('IssueNewThankyouComponent', () => {
  let component: IssueNewThankyouComponent;
  let fixture: ComponentFixture<IssueNewThankyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueNewThankyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueNewThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
