import { Component, Input, OnDestroy } from '@angular/core'

import { VotingDTO } from '../../../models/VotingDTO'
import { VotingService } from '../../../services/voting.service'

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnDestroy {
  @Input() voting?: VotingDTO

  get candidatesList() {
    if (this.voting === undefined) throw new Error('voting is undefined')
    const candidates = this.voting.candidates.sort((a, b) => a.votes - b.votes)
    candidates.forEach((candidate, index) => {
      if (this.voting === undefined) throw new Error('voting is undefined')
      candidate.isWinner = index < this.voting.numberOfWinners
    })
    this.votingService.updateVoting({ ...this.voting, candidates })
    return candidates
  }

  ngOnDestroy() {}

  constructor(private votingService: VotingService) {}
}
