import { FormControl } from '@angular/forms'

export interface VotingForm {
  name: FormControl<string>
  numberOfCandidates: FormControl<number>
  numberOfWinners: FormControl<number>
  peopleInCensus: FormControl<number>
}
