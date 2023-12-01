import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-founders-container',
  templateUrl: './founders-container.component.html',
  styleUrls: ['./founders-container.component.css'],
})
export class FoundersContainerComponent {
  dummyData: any;
  coloumnArr = ['name','phone','email','website'];

  constructor(private http: HttpClient) {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((res) => {
        console.log(res);
        this.dummyData = res;
      });
  }
}
