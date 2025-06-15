import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.css'
})
export class CardDashboardComponent {
  @Input() title: string = '';
  @Input() customClass: string = '';
}
