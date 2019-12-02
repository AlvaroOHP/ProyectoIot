import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { DataServiceService } from '../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent implements OnInit {

  tempData = [];
  humData = [];
  colorData = [];
  gasData = [];
  Temperatura = 0;
  Humedad = 0;
  Color = 0;
  Gas = 0;
  interval: any;

  productos: Producto[];
  constructor(private dataService: DataServiceService,
              private productoService: ProductoService,
              private router: Router,
              private route: ActivatedRoute,
     ) { }

  ngOnInit() {

    this.productos = this.productoService.getProductos();
    this.interval = setInterval(() => {
      this.refreshData();
      this.productos = this.productoService.getProductos();
  }, 2000);
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
      const object = this.ParseJson(this.tempData);
      while(object.feeds[object.feeds.length - 1 - (i)].field1 == null){
        i++;
      }

      this.Temperatura = Math.round(object.feeds[object.feeds.length - 1 - i].field1);
      this.productoService.setTemperature(this.Temperatura);
    });

    this.dataService.sendGetRequestHumedad().subscribe(res => {
      let i=0;
      this.humData = res as any[];
      const object = this.ParseJson(this.humData);

      while(object.feeds[object.feeds.length - 1 - (i)].field2 == null){
        i++;
      }
      this.Humedad = Math.round(object.feeds[object.feeds.length - 1 - i].field2);
      this.productoService.setHumedad(this.Humedad);
    });

    this.dataService.sendGetRequestColor().subscribe(res => {
      let i=0;
      this.colorData = res as any[];
      const object = this.ParseJson(this.colorData);

      while(object.feeds[object.feeds.length - 1 - (i)].field4 == null){
        i++;
      }
      this.Color = Math.round(object.feeds[object.feeds.length - 1 - i].field4);
      this.productoService.setColor(this.Color);
    });

    this.dataService.sendGetRequestGas().subscribe(res => {
      let i=0;
      this.gasData = res as any[];
      const object = this.ParseJson(this.gasData);

      while(object.feeds[object.feeds.length - 1 - (i)].field5 == null){
        i++;
      }
      this.Gas = Math.round(object.feeds[object.feeds.length - 1 - i].field5);
      this.productoService.setGas(this.Gas);
    });
  }

  checkTemperature(){
    if(Math.abs(this.Temperatura-23)<=2){
      this.productoService.setTemperaturaState(true);
    }
      else{
        this.productoService.setTemperaturaState(false);
    }
  }

  checkHumedad(){
    if(Math.abs(this.Humedad-25)<=2){
      this.productoService.setHumedadState(true);
    }
      else{
        this.productoService.setHumedadState(false);
    }
  } 

}
