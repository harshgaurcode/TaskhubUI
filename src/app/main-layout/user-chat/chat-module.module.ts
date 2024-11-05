import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatContainerComponent],
  imports: [CommonModule, ChatRoutingModule, FormsModule],
})
export class ChatModuleModule {}
