import { Injectable } from '@angular/core'

import { Candidate } from '../models/Candidate'
import { Voting } from '../models/Voting'

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  voting: Voting

  setVotingName(name: string) {
    this.voting.setName(name)
  }

  getVotingName = () => this.voting.getName()

  setCandidates(candidates: Array<Candidate>) {
    this.voting.setCandidates(candidates)
  }

  setNumberOfCandidates(numberOfCandidates: number) {
    this.voting.setNumberOfCandidates(numberOfCandidates)
  }

  getNumberOfCandidates = () => this.voting.getNumberOfCandidates()

  setNumberOfWinners(numberOfWinners: number) {
    this.voting.setNumberOfWinners(numberOfWinners)
  }

  getNumberOfWinners = () => this.voting.getNumberOfWinners()

  setPeopleInCensus(peopleInCensus: number) {
    this.voting.setPeopleInCensus(peopleInCensus)
  }

  getPeopleInCensus = () => this.voting.getPeopleInCensus()

  constructor() {
    this.voting = new Voting()
  }
}
