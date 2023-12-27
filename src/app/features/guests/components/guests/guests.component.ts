import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromGuests from '../../../../core/stores/guest';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent implements OnInit {
  guests$ = this.store.select(fromGuests.selectAllGuests);
  defaultGuests: ReadonlyArray<fromGuests.Guest> = [
    {
      id: crypto.randomUUID(),
      cellPhone: '1',
      email: 'email',
      fullName: 'Full Name',
      isAttendeeConfirmed: null,
      picture: 'pic',
    },
  ];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      fromGuests.GuestsActions.loadGuests({ guests: this.defaultGuests })
    );
  }
}
