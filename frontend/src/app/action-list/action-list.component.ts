import { Component, OnInit } from '@angular/core';
import { ActionService, Action } from '../action.service';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {
  actions: Action[] = [];

  constructor(private actionService: ActionService) {}

  ngOnInit() {
    this.fetchActions();
  }

  fetchActions() {
    this.actionService.getActions().subscribe((data) => (this.actions = data));
  }
}
