import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { selectGuests } from '../../../../core/store/guests/guest.selectors';

@Component({
  selector: 'app-guests-dataview',
  standalone: true,
  imports: [ButtonModule, TagModule, DataViewModule, CommonModule],
  templateUrl: './guests-dataview.component.html',
  styleUrl: './guests-dataview.component.scss',
})
export class GuestsDataviewComponent {
  guests$ = this.store.select(selectGuests);

  constructor(private readonly store: Store) {}
}
