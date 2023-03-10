import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module'
import { AdminRoutingModule } from './admin-routing.module'
import { CandidatesFormComponent } from './components/candidates-form/candidates-form.component'
import { LayoutComponent } from './components/layout/layout.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ResultsListComponent } from './components/results-list/results-list.component'
import { VotingCreationFormComponent } from './components/voting-creation-form/voting-creation-form.component'
import { CreationPageComponent } from './pages/creation-page/creation-page.component'
import { ResultsPageComponent } from './pages/results-page/results-page.component'
import { VotingManagementPageComponent } from './pages/voting-management-page/voting-management-page.component'

@NgModule({
  declarations: [
    CandidatesFormComponent,
    NavbarComponent,
    VotingCreationFormComponent,
    CreationPageComponent,
    ResultsPageComponent,
    VotingManagementPageComponent,
    LayoutComponent,
    ResultsListComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, FormsModule, ReactiveFormsModule]
})
export class AdminModule {}
