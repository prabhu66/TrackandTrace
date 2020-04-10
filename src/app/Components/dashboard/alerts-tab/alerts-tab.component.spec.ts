import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsTabComponent } from './alerts-tab.component';

describe('AlertsTabComponent', () => {
  let component: AlertsTabComponent;
  let fixture: ComponentFixture<AlertsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
