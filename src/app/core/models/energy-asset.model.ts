export interface EnergyAsset {
  id: string;
  name: string;
  type: 'PV' | 'Wind' | 'Battery';
  maxCapacity: number;
  targetEfficiency: number;
  currentValues: {
    activePower: number;
    reactivePower: number;
    voltage: number;
    efficiency: number;
    powerFactor: number;
  };
}

export interface EnergyAssetTimeseries {
  assetId: string;
  timestamp: string;
  activePower: number;
  voltage: number;
}
