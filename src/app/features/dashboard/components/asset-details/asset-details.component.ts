import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import {
  EnergyAsset,
  EnergyAssetTimeseries,
} from '@core/models/energy-asset.model';
import { SkeletonComponent } from '@shared/skeleton/skeleton.component';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, SkeletonComponent, NgxEchartsModule],
})
export class AssetDetailsComponent implements OnChanges {
  @Input({ required: true }) asset!: EnergyAsset;
  @Input() timeseriesData: EnergyAssetTimeseries[] = [];
  @Input() loading = false;

  powerDistributionOption: any;
  efficiencyGaugeOption: any;
  dailyTrendOption: any;

  constructor() {
    // Initialize echarts
    import('echarts');
  }

  ngOnChanges(): void {
    this.updateCharts();
  }

  private updateCharts(): void {
    // Power Distribution Pie Chart
    const availableCapacity =
      this.asset.maxCapacity - this.asset.currentValues.activePower;
    const usedPercentage =
      (this.asset.currentValues.activePower / this.asset.maxCapacity) * 100;

    this.powerDistributionOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} W ({d}%)',
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          data: [
            {
              value: this.asset.currentValues.activePower,
              name: 'Active Power',
              itemStyle: { color: '#5470c6' },
            },
            {
              value: availableCapacity,
              name: 'Available Capacity',
              itemStyle: { color: '#91cc75' },
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    // Updated Efficiency Gauge configuration
    const efficiency = this.calculateEfficiency();
    this.efficiencyGaugeOption = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          radius: '100%',
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              width: 14,
              color: [
                [0.3, '#ff4d4f'], // Red for low efficiency
                [0.7, '#faad14'], // Yellow for medium efficiency
                [1, '#52c41a'], // Green for high efficiency
              ],
            },
          },
          pointer: {
            length: '60%',
            width: 6,
            itemStyle: {
              color: '#1890ff',
            },
          },
          axisTick: {
            distance: -18,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -18,
            length: 14,
            lineStyle: {
              color: '#fff',
              width: 3,
            },
          },
          axisLabel: {
            color: '#464646',
            fontSize: 14,
            distance: -36,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            color: '#464646',
            fontSize: 24,
            offsetCenter: [0, '20%'],
          },
          data: [
            {
              value: efficiency,
              name: 'Efficiency',
              title: {
                offsetCenter: [0, '-65%'],
                fontSize: 16,
                color: '#464646',
              },
            },
          ],
        },
      ],
    };

    // Daily Power Trend
    const timeData = this.calculateTimeIntervals();
    const powerData = this.calculatePowerData();

    this.dailyTrendOption = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const time = params[0].name;
          const power = params[0].value;
          return `${time}<br/>Power: ${power} W`;
        },
      },
      xAxis: {
        type: 'category',
        data: timeData,
        axisLabel: {
          fontSize: 10,
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Power (W)',
        axisLabel: {
          fontSize: 10,
        },
      },
      series: [
        {
          data: powerData,
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.3,
          },
          itemStyle: {
            color: '#5470c6',
          },
        },
      ],
    };
  }

  private calculateEfficiency(): number {
    if (this.timeseriesData.length === 0) return 0;
    const maxPower = Math.max(...this.timeseriesData.map((d) => d.activePower));
    const avgPower =
      this.timeseriesData.reduce((acc, curr) => acc + curr.activePower, 0) /
      this.timeseriesData.length;
    return Math.round((avgPower / maxPower) * 100);
  }

  private calculateTimeIntervals(): string[] {
    if (this.timeseriesData.length === 0) return [];

    // Take 6 evenly spaced time points
    const interval = Math.floor(this.timeseriesData.length / 5);
    return this.timeseriesData
      .filter((_, index) => index % interval === 0)
      .slice(0, 6)
      .map((data) => new Date(data.timestamp).toLocaleTimeString());
  }

  private calculatePowerData(): number[] {
    if (this.timeseriesData.length === 0) return [];

    // Take 6 evenly spaced power readings
    const interval = Math.floor(this.timeseriesData.length / 5);
    return this.timeseriesData
      .filter((_, index) => index % interval === 0)
      .slice(0, 6)
      .map((data) => data.activePower);
  }
}
