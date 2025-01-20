import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetTableComponent } from './asset-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@shared/material.module';

describe('AssetTableComponent', () => {
  let component: AssetTableComponent;
  let fixture: ComponentFixture<AssetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetTableComponent, MaterialModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetTableComponent);
    component = fixture.componentInstance;
    component.timeseriesData = []; // Initialize with empty array or mock data
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
