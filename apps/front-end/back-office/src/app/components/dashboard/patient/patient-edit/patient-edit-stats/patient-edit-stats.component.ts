import { Component, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';

export const series = {
  monthDataSeries1: {
    responseTime: [
      1.85, 2.0, 3.9, 4.5, 5.7, 6.7, 7.5, 8.3, 8.85, 8.7, 8.9, 9.2, 9.95, 12.3,
      17.55, 12.9, 15.25, 15.65, 15.1, 15.85,
    ],
    dates: [
      '13 Nov 2017',
      '14 Nov 2017',
      '15 Nov 2017',
      '16 Nov 2017',
      '17 Nov 2017',
      '20 Nov 2017',
      '21 Nov 2017',
      '22 Nov 2017',
      '23 Nov 2017',
      '24 Nov 2017',
      '27 Nov 2017',
      '28 Nov 2017',
      '29 Nov 2017',
      '30 Nov 2017',
      '01 Dec 2017',
      '04 Dec 2017',
      '05 Dec 2017',
      '06 Dec 2017',
      '07 Dec 2017',
      '08 Dec 2017',
    ],
  },
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'webonjour-patient-edit-stats',
  templateUrl: './patient-edit-stats.component.html',
  styleUrls: ['./patient-edit-stats.component.scss'],
})
export class PatientEditStatsComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions = {
    series: [
      {
        name: 'Temps de réponse',
        data: series.monthDataSeries1.responseTime,
      },
    ],
    chart: {
      type: 'area',
      height: 450,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },

    title: {
      text: 'Temps de réponse moyen',
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    labels: series.monthDataSeries1.dates,
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      title: {
        text: 'Temps de réponse moyen (s)',
      },
    },
    legend: {
      horizontalAlign: 'left',
      labels: {
        colors: '#000000',
      },
    },
    tooltip: {
      shared: false,
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: function (val: number) {
          return val + ' s';
        },
      },
    },
  };
}
