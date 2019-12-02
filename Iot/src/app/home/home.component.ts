import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tempData = [];
  humData = [];
  colorData = [];
  gasData = [];
  Temperatura = 0;
  Humedad = 0;
  Color = 0;
  Gas = 0;
  interval: any;
  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    //this.refreshData();
    this.interval = setInterval(() => {
        this.refreshData();
    }, 1500);
  }

  getTemperature(){

    if(this.Temperatura > 20){
      return 'green';
    }else{
      return 'red';
    }
  }

  ParseJson(variable: any[]){
    const a = JSON.stringify(variable);
    const object = JSON.parse(a);
    return object;
  }

  refreshData(){
    this.dataService.sendGetRequestTemperatura().subscribe(res => {
      let i=0;
      this.tempData = res as any[];
      this.dataService.setTemperature(this.tempData);
      const object = this.ParseJson(this.tempData);
      console.log("Dato del campo de temperatura: " + object.feeds[object.feeds.length - 1].field1);

      while(object.feeds[object.feeds.length - 1 - i].field1 == 'null'){
        i++;
      }
      this.Temperatura = object.feeds[object.feeds.length - 1 - i].field1;
    });

    this.dataService.sendGetRequestHumedad().subscribe(res => {
      let i=0;
      this.humData = res as any[];
      const object = this.ParseJson(this.humData);
      console.log("Dato del campo de humedad: " + object.feeds[object.feeds.length - 1].field2);

      while(object.feeds[object.feeds.length - 1 - i].field2 == 'null'){
        console.log("hola");
        i++;
      }
      this.Humedad = object.feeds[object.feeds.length - 1 - i].field2;
    });

    this.dataService.sendGetRequestColor().subscribe(res => {
      let i=0;
      this.colorData = res as any[];
      const object = this.ParseJson(this.colorData);
      console.log("Dato del campo de color: " + object.feeds[object.feeds.length - 1].field4);

      while(object.feeds[object.feeds.length - 1 - i].field4 == 'null'){
        i++;
      }
      this.Color = object.feeds[object.feeds.length - 1 - i].field4;
    });

    this.dataService.sendGetRequestGas().subscribe(res => {
      let i=0;
      this.gasData = res as any[];
      const object = this.ParseJson(this.gasData);
      console.log("Dato del campo de gas: " + object.feeds[object.feeds.length - 1].field5);

      while(object.feeds[object.feeds.length - 1 - i].field5 == 'null'){
        console.log("hola");
        i++;
      }
      this.Gas = object.feeds[object.feeds.length - 1 - i].field5;
    });
  }

}
