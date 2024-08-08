import { Component } from '@angular/core';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userName: string = '';
  date_time: Date = new Date();
  quote: string = '“Be yourself; everyone else is already taken.”';
}
