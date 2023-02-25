import { Component, OnDestroy } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { VotingDTO } from 'src/app/models/VotingDTO'
import { VotingService } from 'src/app/services/voting.service'

import { VotingStatus } from '../../../models/VotingStatus'

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnDestroy {
  votingStatus: VotingStatus
  votingList: VotingDTO[]
  selectedVoting?: VotingDTO
  selectedVotingFormControl: FormControl
  votingStatusSubscription: Subscription
  votingListSubscription: Subscription
  selectedVotingFormControlSubscription: Subscription

  subscribeToVotingStatus() {
    this.votingStatusSubscription = this.votingService
      .getVotingStatus()
      .subscribe(status => (this.votingStatus = status))
  }

  subscribeToVotingList() {
    this.votingListSubscription = this.votingService.getVotingList().subscribe(votingList => {
      if (votingList.length === 1) this.selectedVoting = votingList[0]
      this.votingList = votingList
    })
  }

  subscribeToSelectedVotingFormControl() {
    this.selectedVotingFormControlSubscription = this.selectedVotingFormControl.valueChanges.subscribe({
      next: value => (this.selectedVoting = value)
    })
  }

  ngOnDestroy(): void {
    this.votingStatusSubscription.unsubscribe()
    this.votingListSubscription.unsubscribe()
    this.selectedVotingFormControlSubscription.unsubscribe()
  }

  constructor(private votingService: VotingService) {
    this.votingStatus = 'undefined'
    this.votingList = []
    this.selectedVotingFormControl = new FormControl('', [Validators.required])
    this.votingStatusSubscription = new Subscription()
    this.votingListSubscription = new Subscription()
    this.selectedVotingFormControlSubscription = new Subscription()
    this.subscribeToVotingStatus()
    this.subscribeToVotingList()
    this.subscribeToSelectedVotingFormControl()
  }
}
