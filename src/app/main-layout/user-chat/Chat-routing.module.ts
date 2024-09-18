import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ROUTES } from '@angular/router';
import { ChatContainerComponent } from './chat-container/chat-container.component';

const routes: Routes = [
  {
    path: '',
    component: ChatContainerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
