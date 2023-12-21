import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-chart-1',
  templateUrl: './chart-1.component.html',
  styleUrls: ['./chart-1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chart1Component {
  private adminService = inject(AdminService);

  public chart: any;

  ngOnInit(): void {
    this.adminService.chartOnedata().subscribe((res:any) => {
      const data = res.result;
      const profit = data.map((item:any) => {
        return item.profit;
      });
      const label = data.map((item:any) => {
        return item.day;
      });
      
      this.createChart(profit,label);
    });
  }

  createChart(profitData:any[],labels:any[]) {
  
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: 
        labels, 
	       datasets: [
          {
            label: "profit",
            data: profitData,
            backgroundColor: 'blue'
          }
          
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
