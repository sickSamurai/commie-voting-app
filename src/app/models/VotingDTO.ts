import { Candidate } from './Candidate'

export interface VotingDTO {
  name: string
  candidates: Candidate[]
  numberOfCandidates: number
  numberOfWinners: number
  peopleInCensus: number
}
