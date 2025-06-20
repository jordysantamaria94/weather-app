import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private route = inject(Router)

  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    this.route.navigate(["/auth/login"])
  }
}
