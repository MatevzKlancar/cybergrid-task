import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetChartComponent } from './asset-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@shared/material.module';
import { NgxEchartsModule } from 'ngx-echarts';

describe('AssetChartComponent', () => {
  let component: AssetChartComponent;
  let fixture: ComponentFixture<AssetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssetChartComponent,
        MaterialModule,
        BrowserAnimationsModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetChartComponent);
    component = fixture.componentInstance;
    component.timeseriesData = []; // Initialize with empty array or mock data
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
