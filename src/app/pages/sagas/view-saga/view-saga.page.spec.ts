import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSagaPage } from './view-saga.page';

describe('ViewSagaPage', () => {
  let component: ViewSagaPage;
  let fixture: ComponentFixture<ViewSagaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSagaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSagaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
