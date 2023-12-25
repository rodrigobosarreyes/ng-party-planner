import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  tabs: MenuItem[] = [
    {
      label: 'Guests',
      icon: 'pi pi-users',
      routerLink: 'guests',
    },
    {
      label: 'Music',
      icon: 'pi pi-play',
      routerLink: 'music',
    },
  ];
}
