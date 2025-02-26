import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketNavComponent } from './market-nav.component';

describe('MarketNavComponent', () => {
  let component: MarketNavComponent;
  let fixture: ComponentFixture<MarketNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
