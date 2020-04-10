import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLocationTabComponent } from './current-location-tab.component';

describe('CurrentLocationTabComponent', () => {
  let component: CurrentLocationTabComponent;
  let fixture: ComponentFixture<CurrentLocationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLocationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLocationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
