import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // @Input() 'text': string;
  @Input() 'color': string;
  // @Output() btnClick = new EventEmitter();
  // constructor() {}

  ngOnInit(): void {}

  // onClick() {
  //   this.btnClick.emit();
  // }
}
