import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnergyAsset } from '@core/models/energy-asset.model';

@Component({
  selector: 'app-asset-selector',
  templateUrl: './asset-selector.component.html',
  styleUrls: ['./asset-selector.component.scss'],
  imports: [CommonModule],
})
export class AssetSelectorComponent {
  @Input() assets: EnergyAsset[] = [];
  @Output() assetSelected = new EventEmitter<EnergyAsset>();

  onSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    if (selectedIndex > 0) {
      // Skip the placeholder option
      const selectedAsset = this.assets[selectedIndex - 1];
      this.assetSelected.emit(selectedAsset);
    }
  }
}
