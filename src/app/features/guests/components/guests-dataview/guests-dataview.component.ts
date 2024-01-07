import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import {
  selectConfirmedGuests,
  selectGuests,
  selectRejectedGuests,
  selectUnknownGuests,
} from '../../../../core/store/guests/guest.selectors';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Guest } from '../../../../core/store/guests/guest.model';
import {
  AttendingOption,
  GuestsFilterComponent,
} from '../guests-filter/guests-filter.component';
import { GuestActions } from '../../../../core/store/guests/guest.actions';

@Component({
  selector: 'app-guests-dataview',
  standalone: true,
  imports: [
    ButtonModule,
    TagModule,
    DataViewModule,
    CommonModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ConfirmDialogModule,
    GuestsFilterComponent,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './guests-dataview.component.html',
  styleUrl: './guests-dataview.component.scss',
})
export class GuestsDataviewComponent {
  guests$ = this.store.select(selectGuests);

  visible = false;
  newGuestForm: FormGroup;
  filter: { attending: AttendingOption } = { attending: AttendingOption.ALL };

  constructor(
    private readonly messageService: MessageService,
    private readonly store: Store,
    private readonly confirmationService: ConfirmationService,
    private readonly formBuilder: FormBuilder
  ) {
    this.newGuestForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      cellPhone: [null, Validators.required],
      picture: [null, Validators.required],
      isAttendeeConfirmed: [null],
    });
  }

  onClickConfirm(guest: Guest): void {
    this.store.dispatch(GuestActions.attendenceConfirmed(guest));
  }

  onClickReject(guest: Guest): void {
    this.store.dispatch(GuestActions.attendenceDeclined(guest));
  }

  onClickRemove(guest: Guest): void {
    this.confirmationService.confirm({
      message: 'Do you want to remove this record?',
      header: 'Remove Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.store.dispatch(GuestActions.guestRemoved(guest));
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record removed',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: "Record didn't remove",
        });
      },
    });
  }

  save(): void {
    const newGuest = this.newGuestForm.value;
    newGuest.id = crypto.randomUUID();
    this.store.dispatch(GuestActions.guestAdded(newGuest));
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${this.newGuestForm.value.fullName} Added`,
    });
    this.visible = false;
  }

  onClickAdd(): void {
    this.newGuestForm.reset();
    this.visible = true;
  }

  onChangeFilter(value: { attending: AttendingOption }) {
    switch (value.attending) {
      case AttendingOption.ALL:
        this.guests$ = this.store.select(selectGuests);
        break;
      case AttendingOption.ATTENDING:
        this.guests$ = this.store.select(selectConfirmedGuests);
        break;
      case AttendingOption.NOT_ATTENDING:
        this.guests$ = this.store.select(selectRejectedGuests);
        break;
      case AttendingOption.UNKNOW:
        this.guests$ = this.store.select(selectUnknownGuests);
        break;
      default:
        break;
    }
  }
}
