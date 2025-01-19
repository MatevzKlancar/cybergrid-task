import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '@shared/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EnergyAssetTimeseries } from '@core/models/energy-asset.model';

@Component({
  selector: 'app-asset-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers: [DatePipe],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Measurements History</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="table-container">
          <table mat-table [dataSource]="dataSource" class="mat-elevation-z0">
            <ng-container matColumnDef="timestamp">
              <th mat-header-cell *matHeaderCellDef>Timestamp</th>
              <td mat-cell *matCellDef="let element">
                {{ formatDate(element.timestamp) }}
              </td>
            </ng-container>

            <ng-container matColumnDef="activePower">
              <th mat-header-cell *matHeaderCellDef>Active Power (W)</th>
              <td mat-cell *matCellDef="let element">
                {{ element.activePower }}
              </td>
            </ng-container>

            <ng-container matColumnDef="voltage">
              <th mat-header-cell *matHeaderCellDef>Voltage (V)</th>
              <td mat-cell *matCellDef="let element">{{ element.voltage }}</td>
            </ng-container>

            <tr
              mat-header-row
              *matHeaderRowDef="displayedColumns; sticky: true"
            ></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
        <mat-paginator
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 20]"
          showFirstLastButtons
        >
        </mat-paginator>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      mat-card {
        margin-top: 1rem;
      }

      .table-container {
        width: 100%;
        overflow-x: auto;
        border-radius: 4px;
      }

      table {
        width: 100%;
      }

      .mat-column-timestamp {
        min-width: 160px;
      }

      .mat-column-activePower,
      .mat-column-voltage {
        min-width: 120px;
      }

      th.mat-header-cell {
        padding: 0 16px;
        white-space: nowrap;
      }

      td.mat-cell {
        padding: 0 16px;
      }

      @media (max-width: 768px) {
        th.mat-header-cell,
        td.mat-cell {
          padding: 0 8px;
        }
      }
    `,
  ],
})
export class AssetTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() set timeseriesData(data: EnergyAssetTimeseries[]) {
    this.dataSource.data = data;
    // Ensure paginator is reset when data changes
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator.firstPage();
    }
  }

  displayedColumns: string[] = ['timestamp', 'activePower', 'voltage'];
  dataSource = new MatTableDataSource<EnergyAssetTimeseries>([]);

  constructor(private datePipe: DatePipe) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  formatDate(timestamp: string): string {
    return this.datePipe.transform(timestamp, 'medium') || timestamp;
  }
}
