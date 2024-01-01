import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { distinctUntilChanged } from 'rxjs';

export enum AttendingOption {
  ATTENDING,
  NOT_ATTENDING,
  UNKNOW,
  ALL,
}

export interface GuestFilter {
  attending: AttendingOption;
}

@Component({
  selector: 'app-guests-filter',
  standalone: true,
  imports: [SelectButtonModule, ReactiveFormsModule],
  templateUrl: './guests-filter.component.html',
  styleUrl: './guests-filter.component.scss',
})
export class GuestsFilterComponent implements OnInit {
  attendingOptions: { label: string; value: AttendingOption }[] = [
    { label: 'Attending', value: AttendingOption.ATTENDING },
    { label: 'Not Attending', value: AttendingOption.NOT_ATTENDING },
    { label: 'Unknown', value: AttendingOption.UNKNOW },
    { label: 'All', value: AttendingOption.ALL },
  ];

  filterForm = this.fb.group({
    attending: [AttendingOption.ALL, Validators.required],
  });
  attending: AttendingOption = AttendingOption.ALL;
  @Output() readonly filter = new EventEmitter<GuestFilter>();

  constructor(private readonly fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(distinctUntilChanged()).subscribe((v) => {
      if (v.attending !== undefined) {
        this.filter.emit({ attending: v.attending });
      }
    });
  }
}
