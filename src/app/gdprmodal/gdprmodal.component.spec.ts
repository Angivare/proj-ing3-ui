import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GDPRModalComponent } from './gdprmodal.component';

describe('GDPRModalComponent', () => {
  let component: GDPRModalComponent;
  let fixture: ComponentFixture<GDPRModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GDPRModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GDPRModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
