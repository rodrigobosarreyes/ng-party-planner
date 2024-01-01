import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GuestsDataviewComponent } from '../guests-dataview/guests-dataview.component';
import { CommonModule } from '@angular/common';
import {
  AttendingOption,
  GuestsFilterComponent,
} from '../guests-filter/guests-filter.component';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [GuestsDataviewComponent, CommonModule, GuestsFilterComponent],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent {
  guests$ = new BehaviorSubject<Array<unknown>>([]);

  filter: { attending: AttendingOption } = { attending: AttendingOption.ALL };

  onChangeFilter(value: { attending: AttendingOption }) {
    switch (value.attending) {
      case AttendingOption.ALL:
        break;
      case AttendingOption.ATTENDING:
        break;
      case AttendingOption.NOT_ATTENDING:
        break;
      case AttendingOption.UNKNOW:
        break;
      default:
        break;
    }
  }
}
