import { Candidate } from './Candidate'

export interface VotingDTO {
  id?: string
  name: string
  candidates: Candidate[]
  numberOfCandidates: number
  numberOfWinners: number
}
