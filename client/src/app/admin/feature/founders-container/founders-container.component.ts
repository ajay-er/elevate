import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-founders-container',
  templateUrl: './founders-container.component.html',
  styleUrls: ['./founders-container.component.css'],
})
export class FoundersContainerComponent {
  protected founders: any;

  private adminService = inject(AdminService);
  private router = inject(Router);

  coloumnArray : any[] = [
    {header:'Founder Name',fieldName:'firstName',datatype:'string'},
    {header:'email',fieldName:'email',datatype:'string'},
    {header:'role',fieldName:'role',datatype:'string'},
  ];
  
  ngOnInit() {
    this.adminService.getAllFounders().subscribe((res:any) => {
      this.founders = res.result;
      console.log(this.founders);
    });
  }

  editUser(event:any) {
    console.log(event);
    this.router.navigate(['/admin/founders',event.id]);
  }
  
}
