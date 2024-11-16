import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnDestroy {
  @Input() title: string = 'Form';
  isOpen = false;
  private modalSub: Subscription | undefined;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalSub = this.modalService.modalOpen$.subscribe((state) => {
      this.isOpen = state.isOpen;
    });
  }

  close() {
    this.modalService.closeModal();
  }

  ngOnDestroy() {
    this.modalSub?.unsubscribe();
  }
}
