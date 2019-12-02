import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  products = [];
  Temperatura = 0;
  Humedad = 0;
  Color = "test";

  

  constructor(private httpClient: HttpClient) { }

  public sendGetRequestTemperatura(){
    return this.httpClient.get('https://api.thingspeak.com/channels/889988/fields/1.json?api_key=TRCNRU2WNWC0VZSE');
  }

  public sendGetRequestHumedad(){
    return this.httpClient.get('https://api.thingspeak.com/channels/889988/fields/2.json?api_key=TRCNRU2WNWC0VZSE');
  }

  public sendGetRequestColor(){
    return this.httpClient.get('https://api.thingspeak.com/channels/889988/fields/4.json?api_key=TRCNRU2WNWC0VZSE');
  }

  public sendGetRequestGas(){
    return this.httpClient.get('https://api.thingspeak.com/channels/889988/fields/5.json?api_key=TRCNRU2WNWC0VZSE');
  }

  setTemperature(productos: any[]){
  this.products = productos;
  let a = JSON.stringify(this.products);
  const object = JSON.parse(a);
  console.log("Dato del campo de temperatura: " + object.feeds[object.feeds.length - 1].field1);
  this.Temperatura = object.feeds[object.feeds.length - 1].field1;
  }

  setHumedad(productos: any[]){
    this.products = productos;
    let a = JSON.stringify(this.products);
    const object = JSON.parse(a);
    console.log("Dato del campo de humedad: " + object.feeds[object.feeds.length - 1].field2);
    this.Humedad = object.feeds[object.feeds.length - 1].field2;
    }
  

  getTemperatura(){
    return this.Temperatura;
  }

  getHumedad(){
    return this.Humedad;
  }


}
