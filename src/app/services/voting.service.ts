import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { Candidate } from '../models/Candidate'
import { Voting } from '../models/Voting'
import { VotingDTO } from '../models/VotingDTO'
import { VotingStatus } from '../models/VotingStatus'
import { FirebaseService } from './firebase.service'

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  voting: Voting
  votingList: BehaviorSubject<VotingDTO[]>
  votingStatus: BehaviorSubject<VotingStatus>

  subscribeToStatusCollection() {
    this.firebaseService.getStatus().subscribe(status => {
      if (document) this.votingStatus.next(status['value'])
    })
  }

  subscribeToVotingListCollection() {
    this.firebaseService.getVotingList().subscribe(votingList => this.votingList.next(votingList))
  }

  startVoting() {
    if (this.votingList.getValue().length === 0 || this.votingStatus.getValue() === 'started') return false
    this.votingStatus.next('loading')
    this.firebaseService.setStatus('started')
    return true
  }

  finishVoting() {
    if (this.votingStatus.getValue() !== 'started') return false
    this.votingStatus.next('loading')
    this.firebaseService.setStatus('finished')
    return true
  }

  getVotingStatus = () => this.votingStatus.asObservable()

  addVoting() {
    const votingDTO = {
      name: this.voting.getNameValue(),
      candidates: this.voting.getCandidatesValue(),
      numberOfCandidates: this.voting.getNumberOfCandidatesValue(),
      numberOfWinners: this.voting.getNumberOfWinnersValue()
    }

    this.firebaseService.addVoting(votingDTO)
  }

  getVotingList = () => this.votingList.asObservable()

  updateVoting(voting: VotingDTO) {
    this.firebaseService.updateVoting(voting)
  }

  resetVoting = () => {
    if (this.votingStatus.getValue() === 'finished') {
      this.firebaseService.deleteAllVoting()
      this.firebaseService.setStatus('undefined')
      return true
    } else return false
  }

  setVotingName(name: string) {
    this.voting.setName(name)
  }

  getVotingName = () => this.voting.getName()

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

  constructor(private firebaseService: FirebaseService) {
    this.voting = new Voting()
    this.votingList = new BehaviorSubject<VotingDTO[]>([])
    this.votingStatus = new BehaviorSubject<VotingStatus>('undefined')
    this.subscribeToStatusCollection()
    this.subscribeToVotingListCollection()
  }
}
