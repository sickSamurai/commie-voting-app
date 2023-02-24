import { Injectable } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import {
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { addDoc, collection, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from '@firebase/firestore'

import { VotingDTO } from '../models/VotingDTO'
import { VotingStatus } from '../models/VotingStatus'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  votingCollection: CollectionReference<VotingDTO>

  votingConverter: FirestoreDataConverter<VotingDTO> = {
    toFirestore(voting: VotingDTO) {
      return { ...voting }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
      const data = snapshot.data(options)
      return {
        id: snapshot.id,
        name: data['name'],
        candidates: data['candidates'],
        numberOfCandidates: data['numberOfCandidates'],
        numberOfWinners: data['numberOfWinners']
      }
    }
  }

  setStatus(status: VotingStatus) {
    const docRef = doc(this.firestore, 'status/unique-status')
    setDoc(docRef, { value: status })
  }

  getStatus() {
    const docRef = doc(this.firestore, 'status/unique-status')
    return docData(docRef)
  }

  getVotingList() {
    return collectionData(this.votingCollection)
  }

  addVoting(voting: VotingDTO) {
    addDoc(this.votingCollection, { ...voting })
  }

  updateVoting(voting: VotingDTO) {
    if (voting.id === undefined) throw new Error('id is undefined')
    const docRef = doc(this.votingCollection, voting.id)
    updateDoc(docRef, { ...voting })
  }

  deleteAllVoting() {
    this.getVotingList().subscribe(votingList =>
      votingList.forEach(voting => deleteDoc(doc(this.votingCollection, voting.id!)))
    )
  }

  async login() {
    await signInWithEmailAndPassword(this.auth, 'ldmckkb@gmail.com', '123456789')
  }

  constructor(private firestore: Firestore, private auth: Auth) {
    this.login()
    this.votingCollection = collection(this.firestore, 'commie-voting').withConverter(this.votingConverter)
  }
}
