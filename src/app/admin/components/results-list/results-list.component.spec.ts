import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultsListComponent } from './results-list.component'

describe('ResultsTableComponent', () => {
  let component: ResultsListComponent
  let fixture: ComponentFixture<ResultsListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsListComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ResultsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
