import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotesTabComponent } from './user-notes-tab.component';

describe('UserNotesTabComponent', () => {
  let component: UserNotesTabComponent;
  let fixture: ComponentFixture<UserNotesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
