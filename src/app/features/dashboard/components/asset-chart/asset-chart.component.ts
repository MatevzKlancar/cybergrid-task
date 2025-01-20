import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import {
  EnergyAsset,
  EnergyAssetTimeseries,
} from '@core/models/energy-asset.model';
import { EChartsOption } from 'echarts';
import type { ECharts } from 'echarts';

@Component({
  selector: 'app-asset-chart',
  templateUrl: './asset-chart.component.html',
  styleUrls: ['./asset-chart.component.scss'],
  imports: [CommonModule, MaterialModule, NgxEchartsModule],
})
export class AssetChartComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) asset!: EnergyAsset;
  @Input() timeseriesData: EnergyAssetTimeseries[] = [];

  chartOption: EChartsOption = {};
  private chartInstance: ECharts | null = null;

  onChartInit(ec: ECharts): void {
    this.chartInstance = ec;
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }

  ngOnChanges(): void {
    this.updateChartOptions();
  }

  private updateChartOptions(): void {
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (params: any) => {
          const date = new Date(params[0].value[0]);
          return `${date.toLocaleString()}<br/>
                  Active Power: ${params[0].value[1].toFixed(2)} kW<br/>
                  Voltage: ${params[1].value[1].toFixed(2)} V`;
        },
      },
      legend: {
        data: ['Active Power', 'Voltage'],
        top: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter: (value: number) => {
            const date = new Date(value);
            return date.toLocaleString('en-US', {
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            });
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Active Power (kW)',
          position: 'left',
          axisLabel: {
            formatter: '{value} kW',
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          name: 'Voltage (V)',
          position: 'right',
          axisLabel: {
            formatter: '{value} V',
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'Active Power',
          type: 'line',
          data: this.timeseriesData.map((d) => [
            new Date(d.timestamp).getTime(),
            d.activePower,
          ]),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
        },
        {
          name: 'Voltage',
          type: 'line',
          yAxisIndex: 1,
          data: this.timeseriesData.map((d) => [
            new Date(d.timestamp).getTime(),
            d.voltage,
          ]),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 2,
          },
        },
      ],
    };
  }
}
