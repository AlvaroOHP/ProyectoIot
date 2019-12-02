import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { DataServiceService } from '../data-service.service';



describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('works', () => {
  });
});

describe('test Http, ', () => {
  let handler: HttpHandler;
  let httpClient: HttpClient = new HttpClient(handler);
  let dataservice: DataServiceService = new DataServiceService(httpClient);
  const service: HomeComponent = new HomeComponent(dataservice);
  dataservice.sendGetRequestColor().subscribe(res => {
    let i=0;
    service.colorData = res as any[];
    const object = this.ParseJson(this.colorData);
    service.Color = object.feeds[object.feeds.length - 1 - i].field4;
 
  });

  if(service.Color === 0){
    it('works', () => {
    });
  }

});
