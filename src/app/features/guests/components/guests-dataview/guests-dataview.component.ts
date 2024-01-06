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
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Guest } from '../../../../core/store/guests/guest.model';
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
  ],
  providers: [MessageService],
  templateUrl: './guests-dataview.component.html',
  styleUrl: './guests-dataview.component.scss',
})
export class GuestsDataviewComponent {
  guests$ = this.store.select(selectGuests);

  visible = false;
  newGuestForm: FormGroup;

  constructor(
    private readonly messageService: MessageService,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
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
    this.store.dispatch(GuestActions.guestRemoved(guest));
  }

  save(): void {
    this.store.dispatch(GuestActions.guestAdded(this.newGuestForm.value));
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
}
