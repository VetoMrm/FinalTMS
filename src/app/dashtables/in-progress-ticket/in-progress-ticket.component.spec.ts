import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressTicketComponent } from './in-progress-ticket.component';

describe('InProgressTicketComponent', () => {
  let component: InProgressTicketComponent;
  let fixture: ComponentFixture<InProgressTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProgressTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
