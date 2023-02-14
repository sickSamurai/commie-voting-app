import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-voting-form',
  templateUrl: './voting-form.component.html',
  styleUrls: ['./voting-form.component.scss']
})
export class VotingFormComponent {
  @Output() votingCreated = new EventEmitter()

  onVotingCreation() {
    this.votingCreated.emit()
  }
}
