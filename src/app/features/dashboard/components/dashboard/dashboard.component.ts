import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '@shared/material.module';
import {
  EnergyAsset,
  EnergyAssetTimeseries,
} from '@core/models/energy-asset.model';
import { EnergyAssetService } from '@core/services/energy-asset.service';
import { AuthService } from '@core/services/auth.service';
import { AssetDetailsComponent } from '../asset-details/asset-details.component';
import { AssetTableComponent } from '../asset-table/asset-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    AssetDetailsComponent,
    AssetTableComponent,
  ],
})
export class DashboardComponent implements OnInit {
  assets: EnergyAsset[] = [];
  selectedAsset: EnergyAsset | null = null;
  timeseriesData: EnergyAssetTimeseries[] = [];
  currentUser$;

  constructor(
    private energyAssetService: EnergyAssetService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.energyAssetService.getAssets().subscribe({
      next: (assets) => {
        this.assets = assets;
        // Find and select the Wind Turbine asset
        const windAsset = assets.find((asset) => {
          return asset.type === 'Wind';
        });

        if (windAsset) {
          this.onAssetSelected(windAsset);
        } else if (assets.length > 0) {
          this.onAssetSelected(assets[0]);
        }
      },
      error: (error) => {},
    });
  }

  onAssetSelected(asset: EnergyAsset): void {
    this.selectedAsset = asset;
    this.loadTimeseriesData(asset.id);
  }

  loadTimeseriesData(assetId: string): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setHours(endDate.getHours() - 24);

    this.energyAssetService
      .getAssetTimeseries(assetId, startDate, endDate)
      .subscribe({
        next: (data) => {
          // Convert timestamps to Date objects for sorting
          this.timeseriesData = data.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return dateA.valueOf() - dateB.valueOf();
          });
        },
        error: (error) => {
          console.error('Error loading timeseries data:', error);
        },
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
