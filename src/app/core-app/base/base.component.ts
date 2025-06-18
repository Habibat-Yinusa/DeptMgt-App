import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // opendialog() {
  //   this.dialog.open
  // }
}
