import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerTableComponent } from './tracker-table.component';

describe('TrackerTableComponent', () => {
  let component: TrackerTableComponent;
  let fixture: ComponentFixture<TrackerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
