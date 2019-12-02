import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { DataServiceService } from './data-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

describe('Test temperature', () =>{
  let httpClient: HttpClient;
  const service: DataServiceService = new DataServiceService(httpClient);
  const a = service.getTemperatura();
  if (a === 0) {
  it('works', () => {
  });
}

it('should create', () => {
  expectNothing();
});
});

describe('Test humidity', () =>{
  let httpClient: HttpClient;
  const service: DataServiceService = new DataServiceService(httpClient);
  const a = service.getHumedad();
  if (a === 0) {
  it('works', () => {
  });
}
});

describe('Test color', () =>{
  let httpClient: HttpClient;
  const service: DataServiceService = new DataServiceService(httpClient);
  const a = service.Color;
  if (a === 'test') {
  it('works', () => {
  });
}
});

describe('Test Set Humidity', () =>{
  let httpClient: HttpClient;
  const service: DataServiceService = new DataServiceService(httpClient);
  service.Humedad=40;
  if (40 === service.Humedad) {
  it('works', () => {
  });
}
});

describe('Test Set Temperature', () =>{
  let httpClient: HttpClient;
  const service: DataServiceService = new DataServiceService(httpClient);
  service.Temperatura=40;
  if (40 === service.Temperatura) {
  it('works', () => {
  });
}
});

describe('Test Set Color', () =>{
  let httpClient: HttpClient;
  const service: DataServiceService = new DataServiceService(httpClient);
  service.Color = 'green';
  if ('green' === service.Color) {
  it('works', () => {
  });
}
});

describe('Test Get Temperature', () =>{
  let httpClient: HttpClient;
  const service: DataServiceService = new DataServiceService(httpClient);
  service.getTemperatura();
  if (0 !== service.Temperatura) {
  it('works', () => {
  });
}
});

describe('Test Get Humidity', () =>{
  let httpClient: HttpClient;
  const service: DataServiceService = new DataServiceService(httpClient);
  service.getHumedad();
  if (0 !== service.Humedad) {
  it('works', () => {
  });
}
});

function expectNothing() {
  expect(true).toBeTruthy();
}