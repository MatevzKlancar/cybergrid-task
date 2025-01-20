import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetDetailsComponent } from './asset-details.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@shared/material.module';

describe('AssetDetailsComponent', () => {
  let component: AssetDetailsComponent;
  let fixture: ComponentFixture<AssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssetDetailsComponent,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
        BrowserAnimationsModule,
        MaterialModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetDetailsComponent);
    component = fixture.componentInstance;
    // Initialize input properties if needed
    component.asset = {
      id: '1',
      name: 'Test Asset',
      type: 'PV',
      maxCapacity: 100,
      targetEfficiency: 0.95,
      currentValues: {
        activePower: 75,
        reactivePower: 25,
        voltage: 220,
        efficiency: 0.92,
        powerFactor: 0.95,
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
