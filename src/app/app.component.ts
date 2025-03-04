import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'galih-portfolio';

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  ngAfterViewInit() {
    // Ensure the sidebar is initialized
  }

  toggleSidebar() {
    this.sidebar.toggleSidenav();
  }

  onSidebarToggled() {
    console.log('Sidebar toggled');
  }
}
