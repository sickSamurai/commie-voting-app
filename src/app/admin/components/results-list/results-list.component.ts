import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Candidate } from 'src/app/models/Candidate'

import { VotingDTO } from '../../../models/VotingDTO'

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnChanges {
  @Input() voting?: VotingDTO
  candidates: Candidate[] = []
  displayedColumns = ['position', 'name', 'votes', 'isWinner']

  ngOnChanges(changes: SimpleChanges): void {
    const currentVoting = changes['voting'].currentValue as VotingDTO
    this.candidates = currentVoting.candidates.sort((a, b) => a.votes - b.votes).reverse()
    this.candidates.forEach((candidate, index) => {
      candidate.isWinner = index < currentVoting.numberOfWinners
    })
  }
}
