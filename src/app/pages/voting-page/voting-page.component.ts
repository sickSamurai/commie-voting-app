import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { VotingService } from 'src/app/services/voting.service'

import { VotingDTO } from '../../models/VotingDTO'

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnDestroy {
  votingList: VotingDTO[]
  votingListSubscription: Subscription

  subscribeToVotingList() {
    this.votingListSubscription = this.votingService
      .getVotingList()
      .subscribe(list => (this.votingList = list))
  }

  ngOnDestroy(): void {
    this.votingListSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService) {
    this.votingList = []
    this.votingListSubscription = new Subscription()
    this.subscribeToVotingList()
  }
}
