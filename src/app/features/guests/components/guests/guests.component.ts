import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GuestsDataviewComponent } from '../guests-dataview/guests-dataview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [GuestsDataviewComponent, CommonModule],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss',
})
export class GuestsComponent {
  guests$ = new BehaviorSubject<Array<unknown>>([
    {
      cellPhone: '(986) 594-5601',
      email: 'martin.hernandez@example.com',
      fullName: 'Martin Hernandez',
      id: crypto.randomUUID(),
      isAttendeeConfirmed: true,
      picture: 'https://randomuser.me/api/portraits/men/8.jpg',
    },
    {
      cellPhone: '(849) 477-6593',
      email: 'rita.graves@example.com',
      fullName: 'Rita Graves',
      id: crypto.randomUUID(),
      isAttendeeConfirmed: false,
      picture: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    {
      cellPhone: '(603) 753-7823',
      email: 'jeremy.jennings@example.com',
      fullName: 'Jeremy Jennings',
      id: crypto.randomUUID(),
      isAttendeeConfirmed: null,
      picture: 'https://randomuser.me/api/portraits/men/9.jpg',
    },
  ]);
}
