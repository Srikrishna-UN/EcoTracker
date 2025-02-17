
import { CommonModule } from '@angular/common';  // ✅ Required for *ngFor
import { FormsModule } from '@angular/forms';  // ✅ Required for ngModel
import { Component, OnInit } from '@angular/core';
import { ActionService } from './action.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule,CommonModule]
})
export class AppComponent implements OnInit {
  actions: any[] = [];
  newAction = { action: '', date: '', points: 0 };

  constructor(private actionService: ActionService) {}

  ngOnInit() {
    this.loadActions();
  }

  loadActions() {
    this.actionService.getActions().subscribe((data) => {
      this.actions = data;
    });
  }

  addAction() {
    this.actionService.addAction(this.newAction).subscribe(() => {
      this.loadActions(); // Reload actions after adding
      this.newAction = { action: '', date: '', points: 0 };
    });
  }
}
