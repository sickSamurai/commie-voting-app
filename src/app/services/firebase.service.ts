import { Injectable } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import { collectionData, CollectionReference, doc, docData, Firestore, setDoc } from '@angular/fire/firestore'
import { signInWithEmailAndPassword } from '@firebase/auth'
import {
  addDoc,
  collection,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions
} from '@firebase/firestore'

import { VotingDTO } from '../models/VotingDTO'
import { VotingStatus } from '../models/VotingStatus'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  statusCollection: CollectionReference
  votingCollection: CollectionReference<VotingDTO>

  votingConverter: FirestoreDataConverter<VotingDTO> = {
    toFirestore(voting: VotingDTO) {
      return { ...voting }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
      const data = snapshot.data(options)
      return {
        name: data['name'],
        candidates: data['candidates'],
        numberOfCandidates: data['numberOfCandidates'],
        numberOfWinners: data['numberOfWinners']
      }
    }
  }

  setStatus(status: VotingStatus) {
    console.log('You call me to set the status')
    const docRef = doc(this.firestore, 'status/single')
    setDoc(docRef, { status })
  }

  getStatus() {
    const docRef = doc(this.firestore, 'status/single')
    return docData(docRef)
  }

  getVotingList() {
    return collectionData(this.votingCollection)
  }

  addVoting(voting: VotingDTO) {
    addDoc(this.votingCollection, { ...voting })
  }

  async login() {
    await signInWithEmailAndPassword(this.auth, 'ldmckkb@gmail.com', '123456789')
  }

  constructor(private firestore: Firestore, private auth: Auth) {
    this.login()
    this.statusCollection = collection(this.firestore, 'status')
    this.votingCollection = collection(this.firestore, 'voting-list').withConverter(this.votingConverter)
  }
}
