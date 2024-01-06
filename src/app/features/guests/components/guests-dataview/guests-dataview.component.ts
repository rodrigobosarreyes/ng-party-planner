import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-guests-dataview',
  standalone: true,
  imports: [
    ButtonModule,
    TagModule,
    DataViewModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './guests-dataview.component.html',
  styleUrl: './guests-dataview.component.scss',
})
export class GuestsDataviewComponent {
  @Input() guests!: unknown[];

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}

  onClickConfirm(guest: unknown): void {
    // TBD
  }

  onClickReject(guest: unknown): void {
    // TBD
  }

  onClickRemove(guest: unknown): void {
    // TBD
  }

  onClickAdd(): void {
    this.confirmationService.confirm({
      header: 'Create a new Guest',
    });
  }
}
