import { Component, inject } from '@angular/core';
import { FoundersService } from '../../data-access/founders.service';

@Component({
  selector: 'app-founders-list',
  templateUrl: './founders-list.component.html',
  styleUrls: ['./founders-list.component.css'],
})
export class FoundersListComponent {
  private foundersService = inject(FoundersService);
  protected startups!: any;
  searchQuery: string = '';
  searchResult: any[] = [];

  ngOnInit() {
    this.foundersService.getStartups().subscribe((res: any) => {
      console.log(res.result);
      this.startups = res.result;
    });
  }

  onSearch() {
    this.foundersService.search(this.searchQuery).subscribe((res: any) => {
      this.searchResult = res;
    });
  }
}
