import { Component, inject, LOCALE_ID, OnInit, PLATFORM_ID } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { CardDashboardComponent } from '../../components/card-dashboard/card-dashboard.component';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    CardDashboardComponent,
    FormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [DatePipe],
})
export class UsersComponent implements OnInit {
  private weatherAPI = inject(WeatherService);
  private isLoading = inject(LoadingService);
  private datePipe = inject(DatePipe);
  private locale = inject(LOCALE_ID);
  private platformId = inject(PLATFORM_ID)
  private html2pdfFn: any;

  users: any[] = [];
  filteredUsers: any[] = [];

  ngOnInit(): void {
    this.getUsers();

    if (isPlatformBrowser(this.platformId)) {
      import('html2pdf.js').then((module) => {
        this.html2pdfFn = module.default;
      }).catch(_ => {
        alert('Hubo un error al cargar la funcionalidad de PDF. Por favor, recargue la página.');
      });
    }
  }

  async getUsers(): Promise<void> {
    this.isLoading.show();

    await this.weatherAPI
      .users()
      .pipe(
        finalize(() => {
          this.isLoading.hide();
        })
      )
      .subscribe({
        next: (response: any) => {
          if (response.flag) {
            this.users = response.users;
            this.filteredUsers = response.users;
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  searchInUsers(e: any) {
    const search = e.target.value;

    if (search === '') {
      this.filteredUsers = [...this.users];
    }

    this.filteredUsers = this.users.filter(
      (user) => user.name.includes(search) || user.email.includes(search)
    );
  }

  print(): void {
    const printContent = document.getElementById('print-section');
    const WindowPrt = window.open(
      '',
      '',
      'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0'
    );
    if (WindowPrt && printContent) {
      WindowPrt.document.write(printContent.innerHTML);
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }
  }

  exportExcel(): void {
    const headers = ['Nombre', 'Email', 'Fecha Registro', 'Ultimo Login'];

    const csvData = this.users.map((user) => {
      const formattedCreatedAt = this.datePipe.transform(
        user.createdAt,
        'dd/MM/yyyy hh:mm a',
        'America/Mexico_City',
        this.locale
      );
      const formattedUpdatedAt = this.datePipe.transform(
        user.updatedAt,
        'dd/MM/yyyy hh:mm a',
        'America/Mexico_City',
        this.locale
      );

      return [
        `"${user.name}"`,
        `"${user.email}"`,
        `"${formattedCreatedAt || ''}"`,
        `"${formattedUpdatedAt || ''}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...csvData].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'usuarios.csv');

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Tu navegador no soporta la descarga de archivos CSV.');
    }
  }

  exportPDF(): void {
    const element = document.getElementById('print-section');

    if (element) {
      const opt = {
        margin:       0,
        filename:     'usuarios.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      this.html2pdfFn().set(opt).from(element).save();
    } else {
      alert('No se pudo generar el PDF. El contenido no fue encontrado.');
    }
  }

  proximamente(): void {
    alert("¡Esta funcionalidad sera habilitada proximamente!")
  }
}
