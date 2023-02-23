import { Component, OnDestroy } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { VotingDTO } from '../../../models/VotingDTO'
import { VotingService } from '../../../services/voting.service'

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnDestroy {
  votingList: VotingDTO[]
  votingListSubscription: Subscription
  selectedVotingFormControl: FormControl

  subscribeToVotingList() {
    this.votingListSubscription = this.votingService.votingList.subscribe(votingList => (this.votingList = votingList))
  }

  getCandidatesListSorted(votingID?: string) {
    if (votingID) {
      const votingSelected = this.votingList.find(voting => voting.id == votingID)
      if (!votingSelected) throw new Error('voting was not found')
      return votingSelected.candidates.sort((a, b) => a.votes - b.votes)
    } else return this.votingList[0].candidates.sort((a, b) => a.votes - b.votes)
  }

  ngOnDestroy() {
    this.votingListSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService) {
    this.votingList = []
    this.selectedVotingFormControl = new FormControl('', Validators.required)
    this.votingListSubscription = new Subscription()
    this.subscribeToVotingList()
  }
}
