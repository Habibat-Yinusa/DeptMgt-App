import { Injectable } from '@angular/core';
import { DataService } from './api/data.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(public data: DataService) {}
}
