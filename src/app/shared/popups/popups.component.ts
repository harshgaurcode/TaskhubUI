import { Component, Input, input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrl: './popups.component.css',
})
export class PopupsComponent {
  @Input() message: string = '';
  @Input() isVisible: boolean = false;
  @Input() isButtonShow: boolean = false;
  //isVisible: boolean = false;
  IsButtonShow: boolean = false;

  close(): void {
    this.isVisible = false;
  }
}
