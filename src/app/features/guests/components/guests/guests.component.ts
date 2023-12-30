import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromGuests from '../../../../core/stores/guest';
import { GuestService } from '../../services/guest.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [HttpClientModule],
  providers: [GuestService],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent implements OnInit {
  guests$ = this.store.select(fromGuests.selectAllGuests);

  constructor(
    private readonly store: Store,
    private readonly guestService: GuestService
  ) {}

  ngOnInit(): void {
    this.guestService
      .getAllUsers()
      .subscribe((guests) =>
        this.store.dispatch(fromGuests.GuestsActions.loadGuests({ guests }))
      );
  }
}
