import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsVizComponent } from './students-viz.component';

describe('StudentsVizComponent', () => {
  let component: StudentsVizComponent;
  let fixture: ComponentFixture<StudentsVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
