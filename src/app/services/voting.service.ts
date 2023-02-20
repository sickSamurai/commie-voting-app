import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { Candidate } from '../models/Candidate'
import { Voting } from '../models/Voting'
import { VotingDTO } from '../models/VotingDTO'

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  voting: Voting
  votingList: BehaviorSubject<VotingDTO[]>

  setVotingName(name: string) {
    this.voting.setName(name)
  }

  getVotingName = () => this.voting.getName()

  addVoting() {
    const currentVotingList = this.votingList.value

    currentVotingList.push({
      name: this.voting.getNameValue(),
      candidates: this.voting.getCandidatesValue(),
      numberOfCandidates: this.voting.getNumberOfCandidatesValue(),
      numberOfWinners: this.voting.getNumberOfWinnersValue()
    })

    this.votingList.next(currentVotingList)
  }

  getVotingList = () => this.votingList.asObservable()

  setCandidates(candidates: Array<Candidate>) {
    this.voting.setCandidates(candidates)
  }

  getCandidates = () => this.voting.getCandidates()

  setNumberOfCandidates(numberOfCandidates: number) {
    this.voting.setNumberOfCandidates(numberOfCandidates)
  }

  getNumberOfCandidates = () => this.voting.getNumberOfCandidates()

  setNumberOfWinners(numberOfWinners: number) {
    this.voting.setNumberOfWinners(numberOfWinners)
  }

  getNumberOfWinners = () => this.voting.getNumberOfWinners()

  constructor() {
    this.voting = new Voting()
    this.votingList = new BehaviorSubject(new Array<VotingDTO>())
  }
}
