import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  EnergyAsset,
  EnergyAssetTimeseries,
} from '../models/energy-asset.model';

@Injectable({
  providedIn: 'root',
})
export class EnergyAssetService {
  private mockAssets: EnergyAsset[] = [
    {
      id: '1',
      name: 'Solar Panel Array 1',
      type: 'PV',
      maxCapacity: 7200,
      currentValues: {
        activePower: 0,
        voltage: 0,
      },
    },
    {
      id: '2',
      name: 'Wind Turbine 1',
      type: 'Wind',
      maxCapacity: 16000,
      currentValues: {
        activePower: 1423,
        voltage: 225.3,
      },
    },
    {
      id: '3',
      name: 'Battery Storage 1',
      type: 'Battery',
      maxCapacity: 16000,
      currentValues: {
        activePower: 0,
        voltage: 0,
      },
    },
  ];

  getAssets(): Observable<EnergyAsset[]> {
    return of(this.mockAssets);
  }

  getAssetTimeseries(
    assetId: string,
    startDate: Date,
    endDate: Date
  ): Observable<EnergyAssetTimeseries[]> {
    const data: EnergyAssetTimeseries[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      data.push({
        assetId,
        timestamp: currentDate.toISOString(),
        activePower: Math.floor(Math.random() * 1500),
        voltage: 220 + Math.random() * 10,
      });

      currentDate.setMinutes(currentDate.getMinutes() + 15);
    }

    return of(data);
  }
}
