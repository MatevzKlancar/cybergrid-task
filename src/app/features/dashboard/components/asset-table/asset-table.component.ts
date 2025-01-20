import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EnergyAssetTimeseries } from '@core/models/energy-asset.model';

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class AssetTableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() timeseriesData: EnergyAssetTimeseries[] = [];

  displayedColumns: string[] = ['timestamp', 'activePower', 'voltage'];
  dataSource = new MatTableDataSource<EnergyAssetTimeseries>([]);

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(): void {
    if (this.timeseriesData) {
      this.dataSource.data = this.timeseriesData;
      if (this.paginator) {
        this.paginator.firstPage();
      }
    }
  }
}
