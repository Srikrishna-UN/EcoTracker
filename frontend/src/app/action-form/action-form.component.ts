import { Component } from '@angular/core';
import { ActionService } from '../action.service';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent {
  action = '';
  date = '';
  points: number | null = null;

  constructor(private actionService: ActionService) {}

  submitAction() {
    if (this.action && this.date && this.points !== null) {
      this.actionService.addAction({ action: this.action, date: this.date, points: this.points })
        .subscribe(() => {
          this.action = '';
          this.date = '';
          this.points = null;
        });
    }
  }
}
