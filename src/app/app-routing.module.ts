import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueListComponent } from './issue/issue-list/issue-list.component';
import { IssueNewComponent } from './issue/issue-new/issue-new.component';
import { IssueDetailComponent } from './issue/issue-detail/issue-detail.component';
import { IssueEditComponent } from './issue/issue-edit/issue-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/issues', pathMatch: 'full'},
  {
    path: 'issues', component: IssueListComponent, children: [
    {path: ':id', component: IssueDetailComponent},
    {path: ':id/edit', component: IssueEditComponent},
  ]
  },
  {path: 'new-issue', component: IssueNewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
