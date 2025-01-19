export interface EnergyAsset {
  id: string;
  name: string;
  type: 'PV' | 'Wind' | 'Battery';
  maxCapacity: number;
  currentValues: {
    activePower: number;
    voltage: number;
  };
}

export interface EnergyAssetTimeseries {
  assetId: string;
  timestamp: string;
  activePower: number;
  voltage: number;
}
