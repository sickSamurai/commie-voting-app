import { BehaviorSubject } from 'rxjs'

import { Candidate } from './Candidate'

export class Voting {
  name: BehaviorSubject<string>
  candidates: BehaviorSubject<Candidate[]>
  numberOfCandidates: BehaviorSubject<number>
  numberOfWinners: BehaviorSubject<number>

  setName(name: string) {
    this.name.next(name)
  }

  getName = () => this.name.asObservable()

  getNameValue = () => this.name.value

  setCandidates(candidates: Candidate[]) {
    this.candidates.next(candidates)
  }

  getCandidates = () => this.candidates.asObservable()

  getCandidatesValue = () => this.candidates.value

  setNumberOfCandidates(numberOfCandidates: number) {
    this.numberOfCandidates.next(numberOfCandidates)
  }

  getNumberOfCandidates = () => this.numberOfCandidates.asObservable()

  getNumberOfCandidatesValue = () => this.numberOfCandidates.value

  setNumberOfWinners(numberOfWinners: number) {
    this.numberOfWinners.next(numberOfWinners)
  }

  getNumberOfWinners = () => this.numberOfWinners.asObservable()

  getNumberOfWinnersValue = () => this.numberOfWinners.value

  constructor() {
    this.name = new BehaviorSubject('')
    this.candidates = new BehaviorSubject(new Array<Candidate>())
    this.numberOfCandidates = new BehaviorSubject(0)
    this.numberOfWinners = new BehaviorSubject(0)
  }
}
