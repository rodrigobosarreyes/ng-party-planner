import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Guest } from '../../../../core/store/guests/guest.model';

@Component({
  selector: 'app-guests-dataview',
  standalone: true,
  imports: [ButtonModule, TagModule, DataViewModule, CommonModule],
  templateUrl: './guests-dataview.component.html',
  styleUrl: './guests-dataview.component.scss',
})
export class GuestsDataviewComponent {
  @Input() guests!: Guest[];
}
