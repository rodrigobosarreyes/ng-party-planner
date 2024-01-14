import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GuestsDataviewComponent } from '../guests-dataview/guests-dataview.component';
import { GuestActions } from '../../../../core/store/guests/guest.actions';
import { AttendingOption } from '../guests-filter/guests-filter.component';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [GuestsDataviewComponent, CommonModule],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent implements OnInit {
  filter: { attending: AttendingOption } = { attending: AttendingOption.ALL };

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GuestActions.pageOpened());
  }
}
