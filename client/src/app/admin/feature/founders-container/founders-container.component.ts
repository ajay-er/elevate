import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';
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
    this.router.navigate(['/admin/founders',event.id]);
  }

  blockUser(event:any) {
    this.adminService.blockUser(event.userId).subscribe((res:any) => {
      console.log(res);
      const newUser = res.newUser;
      const index = this.founders.findIndex((user: any) => user.userId === newUser.userId);
      if (index !== -1) {
        this.founders[index].isBlocked = newUser.isBlocked;
      }
    });
  }
  
}
