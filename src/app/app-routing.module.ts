import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueListComponent } from './issue/issue-list/issue-list.component';
import { IssueNewComponent } from './issue/issue-new/issue-new.component';
import { IssueDetailComponent } from './issue/issue-detail/issue-detail.component';
import { IssueEditComponent } from './issue/issue-edit/issue-edit.component';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { IssueNewThankyouComponent } from './issue/issue-new/issue-new-thankyou/issue-new-thankyou.component';
import { IssueStartComponent } from './issue/issue-start/issue-start.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'info', component: InfoComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'account', component: AccountComponent },
  { path: 'issue-list', component: IssueListComponent, children: [
    { path: '', component: IssueStartComponent },
    { path: ':id', component: IssueDetailComponent }
  ] },
  { path: 'new-issue', component: IssueNewComponent },
  { path: 'new-issue-thank-you', component: IssueNewThankyouComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
