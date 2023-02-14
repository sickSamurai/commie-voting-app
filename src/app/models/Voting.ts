import { Candidate } from './Candidate'

export interface Voting {
  candidates: Array<Candidate>
  numberOfCandidates: number
  numberOfWinners: number
  PeopleInCensus: number
}
