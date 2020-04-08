import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedTicketComponent } from './closed-ticket.component';

describe('ClosedTicketComponent', () => {
  let component: ClosedTicketComponent;
  let fixture: ComponentFixture<ClosedTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
