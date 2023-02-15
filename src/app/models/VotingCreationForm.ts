import { FormControl } from '@angular/forms'

export interface VotingCreationForm {
  name: FormControl<string>
  numberOfCandidates: FormControl<number>
  numberOfWinners: FormControl<number>
  peopleInCensus: FormControl<number>
}
