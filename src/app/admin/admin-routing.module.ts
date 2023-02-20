import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LayoutComponent } from './components/layout/layout.component'
import { CreationPageComponent } from './pages/creation-page/creation-page.component'
import { ResultsPageComponent } from './pages/results-page/results-page.component'
import { VotingManagementPageComponent } from './pages/voting-management-page/voting-management-page.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'management', pathMatch: 'full' },
      { path: 'management', component: VotingManagementPageComponent },
      { path: 'creation', component: CreationPageComponent },
      { path: 'results', component: ResultsPageComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
