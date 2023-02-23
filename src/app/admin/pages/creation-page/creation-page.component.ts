import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { VotingService } from 'src/app/services/voting.service'

import { VotingStatus } from '../../../models/VotingStatus'

@Component({
  selector: 'app-creation-page',
  templateUrl: './creation-page.component.html',
  styleUrls: ['./creation-page.component.scss']
})
export class CreationPageComponent implements OnDestroy {
  votingCreated: boolean
  votingStatus: VotingStatus
  votingStatusSubscription: Subscription

  showCandidatesForm = () => (this.votingCreated = true)

  showVotingForm = () => (this.votingCreated = false)

  subscribeToVotingStatus = () =>
    (this.votingStatusSubscription = this.votingService
      .getVotingStatus()
      .subscribe(votingStatus => (this.votingStatus = votingStatus)))

  ngOnDestroy(): void {
    this.votingStatusSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService) {
    this.votingCreated = false
    this.votingStatus = 'undefined'
    this.votingStatusSubscription = new Subscription()
    this.subscribeToVotingStatus()
  }
}
