import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core'
import { Candidate } from 'src/app/models/Candidate'

import { VotingDTO } from '../../../models/VotingDTO'
import { VotingService } from '../../../services/voting.service'

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnDestroy, OnChanges {
  @Input() voting?: VotingDTO
  candidates: Candidate[] = []

  ngOnDestroy() {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentVoting = changes['voting'].currentValue as VotingDTO
    this.candidates = currentVoting.candidates.sort((a, b) => a.votes - b.votes).reverse()
    this.candidates.forEach((candidate, index) => {
      candidate.isWinner = index < currentVoting.numberOfWinners
    })
  }

  constructor(private votingService: VotingService) {}
}
