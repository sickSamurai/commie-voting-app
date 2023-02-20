import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { VotingPageComponent } from './voting-page/voting-page.component'

const routes: Routes = [{ path: '', component: VotingPageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule {}
