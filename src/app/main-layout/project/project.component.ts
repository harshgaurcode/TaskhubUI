import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  constructor(private renderer: Renderer2) {}
  isSidebarOpen: boolean = false;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
      this.renderer.addClass(document.body, 'sidebar-open');
    } else {
      this.renderer.removeClass(document.body, 'sidebar-open');
    }
  }
}
