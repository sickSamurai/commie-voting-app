import { Component } from '@angular/core'

@Component({
  selector: 'app-creation-page',
  templateUrl: './creation-page.component.html',
  styleUrls: ['./creation-page.component.scss']
})
export class CreationPageComponent {
  votingCreated = false

  showCandidatesForm = () => (this.votingCreated = true)
  showVotingForm = () => (this.votingCreated = false)
}
