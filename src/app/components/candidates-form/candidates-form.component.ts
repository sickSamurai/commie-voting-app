import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.scss']
})
export class CandidatesFormComponent {
  @Input() remainingCandidates = 0
}
