import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReOpenTicketComponent } from './re-open-ticket.component';

describe('ReOpenTicketComponent', () => {
  let component: ReOpenTicketComponent;
  let fixture: ComponentFixture<ReOpenTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReOpenTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReOpenTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
