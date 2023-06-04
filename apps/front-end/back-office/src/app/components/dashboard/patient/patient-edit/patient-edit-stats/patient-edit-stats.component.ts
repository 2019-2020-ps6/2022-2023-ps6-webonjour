import { AfterViewInit, Component, ViewChild } from '@angular/core';

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
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '@webonjour/front-end/shared/common';
import { Patient } from '@webonjour/util-interface';

const array = new Uint32Array(1);

const dates = [
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
];
export const series = {
  responseTimeDataSeries: {
    responseTime: dates.map((date, index) => {
      window.crypto.getRandomValues(array);
      return Math.floor(
        (array[0] % ((300 * index) / dates.length)) +
          300 +
          (index / dates.length) * 300
      );
    }),
    dates: dates,
  },

  clickAccuracyDataSeries: {
    clickAccuracy: dates.map(() => {
      window.crypto.getRandomValues(array);
      return Math.floor((array[0] % 20) + 80);
    }),
    dates: dates,
  },
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'webonjour-patient-edit-stats',
  templateUrl: './patient-edit-stats.component.html',
})
export class PatientEditStatsComponent implements AfterViewInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions = {
    series: [
      {
        name: 'Temps de réponse',
        data: series.responseTimeDataSeries.responseTime,
        type: 'line',
      },
      {
        name: 'Précision du clic',
        data: series.clickAccuracyDataSeries.clickAccuracy,
        type: 'line',
      },
    ],
    chart: {
      type: 'line',
      height: 450,
      toolbar: {
        tools: {
          zoom: true,
          pan: true,
          reset: true,
          download: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
      distributed: true,
    },
    stroke: {
      curve: 'smooth',
    },

    title: {
      text: 'Temps de réponse moyen et précision du clic',
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    labels: series.responseTimeDataSeries.dates,
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB',
        },
        title: {
          text: 'Temps de réponse (s)',
          style: {
            color: '#008FFB',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        title: {
          text: 'Précision du clic (%)',
          style: {
            color: '#00E396',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    ],
    legend: {
      horizontalAlign: 'left',
      labels: {
        colors: '#000000',
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
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

  aggregateData?: Patient.AggregatedQuestionResult;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {
    this.route.params.subscribe((params) => {
      this.patientService
        .getPatientAggregatedQuestionResults(parseInt(params['id']))
        .subscribe((data) => {
          this.aggregateData = data.data;
        });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.params.subscribe((params) => {
        this.patientService
          .getPatientQuestionResults(parseInt(params['id']))
          .subscribe((data) => {
            this.chartOptions.series[0].data = data.data.map((item) => {
              return item.timeTaken;
            });
            this.chartOptions.series[1].data = data.data.map((item) => {
              return item.clickRatio;
            });

            this.chartOptions.labels = data.data.map((item) => {
              return item.createdAt.toString();
            });
            this.chart.updateOptions(this.chartOptions).then(() => {
              this.chart.hideSeries('Précision du clic');
              this.chart.showSeries('Temps de réponse');
            });
          });
      });
    }, 300);
  }
}
