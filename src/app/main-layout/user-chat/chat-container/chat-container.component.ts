import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from '../services/chatservice.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subscribable } from 'rxjs';
import { HubConnection } from '@microsoft/signalr';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css',
})
export class ChatContainerComponent implements OnInit {
  // public connectedUsers: string[] = [];
  public selectedUser: string = '';
  public message: string = '';
  public messages$ = new BehaviorSubject<any[]>([]);
  public username: string | null = null;

  // private connection: HubConnection;
  public messages: any[] = [];
  public connectedUsers$!: BehaviorSubject<string[]>; // use non-null assertion

  constructor(private chatService: ChatserviceService) {
    this.messages$ = this.chatService.messages$;
    this.connectedUsers$ = this.chatService.connectedUsers$;
    this.username = this.chatService.username; // Set username from the service
  }

  ngOnInit() {}

  async selectUser(user: string) {
    this.selectedUser = user;
    this.messages = []; // Clear previous messages
    this.messages$.next([]); // Reset the observable
    await this.chatService.loadMessageHistory(this.selectedUser);
  }

  sendMessage() {
    if (this.selectedUser && this.message) {
      this.chatService.sendMessageToUser(this.selectedUser, this.message);
      this.message = ''; // Clear the input after sending
    }
  }
}
