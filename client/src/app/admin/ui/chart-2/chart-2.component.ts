import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-chart-2',
  templateUrl: './chart-2.component.html',
  styleUrls: ['./chart-2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chart2Component {
  chart:any;
  private adminService = inject(AdminService);

  
  ngOnInit(): void {
    this.adminService.chartTwodata().subscribe((res:any) => {
      const data = res.result;
      const count = data.map((item:any) => item.data);
      const label = data.map((item:any) => item.label);
      this.createChart(count,label);
    });
  }

  createChart(count:any[],labels:any[]) {

    const data = {
      labels: labels,
      datasets: [{
        label: 'Sub count',
        data: count,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
        ]
      }]
    };
  
    this.chart = new Chart("MyChart2", {
      type: 'doughnut', //this denotes tha type of chart
      data:data,
      options: {
      }
      
    });
  }
}
