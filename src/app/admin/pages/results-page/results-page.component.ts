import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { VotingService } from 'src/app/services/voting.service'

import { VotingStatus } from '../../../models/VotingStatus'

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnDestroy {
  votingStatus: VotingStatus
  votingStatusSubscription: Subscription

  setStatus = (status: VotingStatus) => (this.votingStatus = status)

  subscribeToVotingStatus() {
    this.votingStatusSubscription = this.votingService.getVotingStatus().subscribe(this.setStatus)
  }

  ngOnDestroy(): void {
    this.votingStatusSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService) {
    this.votingStatus = 'undefined'
    this.votingStatusSubscription = new Subscription()
    this.subscribeToVotingStatus()
  }
}
