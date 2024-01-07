import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { selectGuests } from '../../../../core/store/guests/guest.selectors';
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
    // TBD
  }

  onClickReject(guest: Guest): void {
    // TBD
  }

  onClickRemove(guest: Guest): void {
    this.confirmationService.confirm({
      message: 'Do you want to remove this record?',
      header: 'Remove Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
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
    this.visible = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${this.newGuestForm.value.fullName} Added`,
    });
  }

  onClickAdd(): void {
    this.newGuestForm.reset();
    this.visible = true;
  }

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
