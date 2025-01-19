import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssetChartComponent } from './components/asset-chart/asset-chart.component';
import { AssetTableComponent } from './components/asset-table/asset-table.component';
import { AssetSelectorComponent } from './components/asset-selector/asset-selector.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [
    DashboardComponent,
    AssetChartComponent,
    AssetTableComponent,
    AssetSelectorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class DashboardModule {}
