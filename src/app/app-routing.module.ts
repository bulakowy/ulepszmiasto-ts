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

const appRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'info', component: InfoComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'account', component: AccountComponent },
  { path: 'issues', component: IssueListComponent, children: [
    { path: ':id', component: IssueDetailComponent },
    { path: ':id/edit', component: IssueEditComponent },
  ] },
  { path: 'new-issue', component: IssueNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
