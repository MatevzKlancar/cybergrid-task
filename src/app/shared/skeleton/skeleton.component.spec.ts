import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default input values', () => {
    const element: HTMLElement = fixture.nativeElement;
    const loader = element.querySelector('.skeleton-loader') as HTMLElement;

    expect(loader?.style.width).toBe('100%');
    expect(loader?.style.height).toBe('20px');
    expect(loader?.style.borderRadius).toBe('4px');
  });

  it('should apply custom input values', () => {
    component.width = '200px';
    component.height = '40px';
    component.borderRadius = '8px';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const loader = element.querySelector('.skeleton-loader') as HTMLElement;

    expect(loader?.style.width).toBe('200px');
    expect(loader?.style.height).toBe('40px');
    expect(loader?.style.borderRadius).toBe('8px');
  });
});
