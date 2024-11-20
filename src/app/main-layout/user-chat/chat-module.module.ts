import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { DatePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [ChatContainerComponent],
  imports: [CommonModule, ChatRoutingModule, FormsModule],
})
export class ChatModuleModule {}
