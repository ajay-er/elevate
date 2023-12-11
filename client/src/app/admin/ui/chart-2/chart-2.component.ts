import { ChangeDetectionStrategy, Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-2',
  templateUrl: './chart-2.component.html',
  styleUrls: ['./chart-2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chart2Component {
  chart:any;

  
  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    const data = {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
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
