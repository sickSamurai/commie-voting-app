import { BehaviorSubject } from 'rxjs'

import { Candidate } from './Candidate'

export class Voting {
  name: BehaviorSubject<string>
  candidates: BehaviorSubject<Candidate[]>
  numberOfCandidates: BehaviorSubject<number>
  numberOfWinners: BehaviorSubject<number>
  peopleInCensus: BehaviorSubject<number>

  setName(name: string) {
    this.name.next(name)
  }

  getName = () => this.name.asObservable()

  setCandidates(candidates: Candidate[]) {
    this.candidates.next(candidates)
  }

  getCandidates = () => this.candidates.asObservable()

  setNumberOfCandidates(numberOfCandidates: number) {
    this.numberOfCandidates.next(numberOfCandidates)
  }

  getNumberOfCandidates = () => this.numberOfCandidates.asObservable()

  setNumberOfWinners(numberOfWinners: number) {
    this.numberOfWinners.next(numberOfWinners)
  }

  getNumberOfWinners = () => this.numberOfWinners.asObservable()

  setPeopleInCensus(peopleInCensus: number) {
    this.peopleInCensus.next(peopleInCensus)
  }

  getPeopleInCensus = () => this.peopleInCensus.asObservable()

  constructor() {
    this.name = new BehaviorSubject('')
    this.candidates = new BehaviorSubject(new Array<Candidate>())
    this.numberOfCandidates = new BehaviorSubject(0)
    this.numberOfWinners = new BehaviorSubject(0)
    this.peopleInCensus = new BehaviorSubject(0)
  }
}
