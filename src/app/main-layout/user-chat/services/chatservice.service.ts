import { Injectable } from '@angular/core';

import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatserviceService {
  public readonly username: string | null = localStorage.getItem('User');
  public readonly url: string = `https://localhost:7054/chat?username=${this.username}`;

  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.url, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  public messages$ = new BehaviorSubject<any[]>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.start();
    this.connection.on(
      'ReceiveMessage',
      (sender: string, content: string, timestamp: string) => {
        const newMessage = { sender, content, timestamp };
        this.messages.push(newMessage); // Store the message
        this.messages$.next(this.messages); // Update the BehaviorSubject
      }
    );

    this.connection.on('ReceiveMessageHistory', (messages: any[]) => {
      this.messages = messages;
      this.messages$.next(this.messages);
    });

    this.connection.on('ConnectedUsers', (users: string[]) => {
      this.connectedUsers$.next(users);
      console.log(users);
    });
  }

  // Start connection
  public async start() {
    try {
      await this.connection.start();
      console.log('Connection is established!');

      await this.getConnectedUsers();
    } catch (error) {
      console.log(error);
    }
  }

  // Send message to a specific user
  public async sendMessageToUser(recipientUsername: string, message: string) {
    return this.connection.invoke(
      'SendMessageToUser',
      recipientUsername,
      message
    );
  }

  // Get connected users
  public async getConnectedUsers() {
    const users = await this.connection.invoke('GetConnectedUsers');
    this.connectedUsers$.next(users); // Update the BehaviorSubject with the connected users
  }

  // Stop the connection when the user leaves
  public async leaveChat() {
    return this.connection.stop();
  }

  public async loadMessageHistory(recipientUsername: string) {
    try {
      const messageHistory = await this.connection.invoke(
        'LoadMessageHistory',
        recipientUsername
      );
    } catch (error) {
      console.error('Error loading message history:', error);
    }
  }
}
