import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatSettingsComponent } from './chat-settings/chat-settings.component';
import { ChatRoutingModule } from './Chat-routing.module';

@NgModule({
  declarations: [
    ChatContainerComponent,
    ChatListComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    ChatInputComponent,
    ChatSettingsComponent,
  ],
  imports: [CommonModule, ChatRoutingModule],
})
export class ChatModuleModule {}
