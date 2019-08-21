import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCounterComponent } from './progress-counter.component';

describe('ProgressCounterComponent', () => {
  let component: ProgressCounterComponent;
  let fixture: ComponentFixture<ProgressCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
