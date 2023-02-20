import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module'
import { VotingPageComponent } from './voting-page/voting-page.component'
import { WebsiteRoutingModule } from './website-routing.module'

@NgModule({
  declarations: [VotingPageComponent],
  imports: [CommonModule, WebsiteRoutingModule, SharedModule, FormsModule, ReactiveFormsModule]
})
export class WebsiteModule {}
