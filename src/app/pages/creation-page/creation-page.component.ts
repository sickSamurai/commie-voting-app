import { Component } from '@angular/core'

@Component({
  selector: 'app-creation-page',
  templateUrl: './creation-page.component.html',
  styleUrls: ['./creation-page.component.scss']
})
export class CreationPageComponent {
  creatingVoting = false

  showCandidatesForm = () => (this.creatingVoting = true)
  showVotingForm = () => (this.creatingVoting = false)
}
