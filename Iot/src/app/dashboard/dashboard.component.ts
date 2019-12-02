import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Producto } from '../producto';
import { DataServiceService } from '../data-service.service';
import { ProductoService } from '../producto.service';
import { Router, ActivatedRoute } from '@angular/router';

// core components
let data = {
  chart: {
    caption: "Temperatura",
    subcaption: "(Per Quarter minute)",
    lowerlimit: "0",
    upperlimit: "60",
    numbersuffix: "°C",
    thmfillcolor: "#008ee4",
    showgaugeborder: "1",
    gaugebordercolor: "#008ee4",
    gaugeborderthickness: "2",
    plottooltext: "Temperature: <b>$datavalue</b> ",
    theme: "fusion",
    showvalue: "1"
  },
  value: "20"
};

let data2 = {
  chart: {
    caption: "Humedad",
    subcaption: "(Per Quarter minute)",
    lowerlimit: "0",
    upperlimit: "100",
    numbersuffix: "%",
    thmfillcolor: "#006ee4",
    showgaugeborder: "1",
    gaugebordercolor: "#008ee4",
    gaugeborderthickness: "2",
    plottooltext: "Temperature: <b>$datavalue</b> ",
    theme: "fusion",
    showvalue: "1"
  },
  value: "20"
};

let data3 = {
  chart: {
    caption: "Color",
    subcaption: "Indicador",
    theme: "fusion",
    showvalue: "0",
    pointerbghovercolor: "#ffffff",
    pointerbghoveralpha: "80",
    pointerhoverradius: "12",
    showborderonhover: "1",
    pointerborderhovercolor: "#333333",
    pointerborderhoverthickness: "2",
    showtickmarks: "0",
    numbersuffix: "%"
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "35",
        label: "Malo",
        code: "#e44a00"
      },
      {
        minvalue: "35",
        maxvalue: "70",
        label: "Normal",
        code: "#f8bd19"
      },
      {
        minvalue: "70",
        maxvalue: "100",
        label: "Good",
        code: "#6baa01"
      }
    ]
  },
  pointers: {
    pointer: [
      {
        value: "36",
        tooltext: "Higher degree of satisfaction score of $datavalue  "
      }
    ]
  }
};

let data4 = {
  chart: {
    caption: "Emisiones de gas etileno",
    lowerlimit: "0",
    upperlimit: "100",
    showvalue: "1",
    numbersuffix: "%",
    theme: "fusion",
    showtooltip: "0"
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "50",
        code: "#F2726F"
      },
      {
        minvalue: "50",
        maxvalue: "75",
        code: "#FFC533"
      },
      {
        minvalue: "75",
        maxvalue: "100",
        code: "#62B58F"
      }
    ]
  },
  dials: {
    dial: [
      {
        value: "81"
      }
    ]
  }
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  width = 200;
  height = 400;
  width2 = 400;
  height2 = 250;
  type = "thermometer";
  type2 = "hlineargauge";
  type3 = "angulargauge";
  dataFormat = "json";
  dataSource = data;
  dataSource2 = data2;
  dataSource3= data3;
  dataSource4 = data4;
  producto: Producto;

  tempData = [];
  humData = [];
  colorData = [];
  gasData = [];
  Temperatura = 0;
  Humedad = 0;
  Color = 0;
  Gas = 0;
  interval: any;
  getId=[];
  productos: Producto[];
  constructor(private dataService: DataServiceService,
              private productoService: ProductoService,
              private router: Router,
              private route: ActivatedRoute,
     ) { }

  ngOnInit() {
    this.getId= this.router.url.split('/');
    this.producto = this.productoService.getProductobyId(this.getId[2]);
    this.productos = this.productoService.getProductos();

    if(this.getId[2]!=1){
      this.Temperatura =this.producto.temperatura;
      this.Gas = this.producto.gas;
      this.Humedad= this.producto.humedad;
      this.Color = this.producto.color;
    data.value = this.producto.temperatura.toString();
    data2.value = this.producto.humedad.toString();
      if((this.producto.color&0xFF) >= 113){
        data3.pointers.pointer[0].value="17";
      }
      if((this.producto.color&0xFF) <= 36){
        data3.pointers.pointer[0].value="80";
      }

      if((this.producto.color&0xFF) > 36 && (this.Color&0xFF) < 113 ){
        data3.pointers.pointer[0].value="50";
      }
      if (this.producto.gas >= 3500){
        data4.dials.dial[0].value='25';
      }
      if(this.producto.gas <= 3200){
        data4.dials.dial[0].value='80';
      }
      if(this.producto.gas > 3200 && this.producto.gas < 3500){
        data4.dials.dial[0].value='60';
      }
    }
    if(this.getId[2]==1){
    this.interval = setInterval(() => {
      this.refreshData();
      this.productos = this.productoService.getProductos();
  }, 1500);
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
      const object = this.ParseJson(this.tempData);
      while(object.feeds[object.feeds.length - 1 - i].field1 == 'null'){
        i++;
      }
      this.Temperatura = Math.round(object.feeds[object.feeds.length - 1 - i].field1);
      data.value=this.Temperatura.toString();

      this.productoService.setTemperature(this.Temperatura);

    });

    this.dataService.sendGetRequestHumedad().subscribe(res => {
      let i=0;
      this.humData = res as any[];
      const object = this.ParseJson(this.humData);
      console.log("Dato del campo de humedad: " + object.feeds[object.feeds.length - 1].field2);
      
      while(object.feeds[object.feeds.length - 1 - i].field2 == 'null'){
        console.log("hola");
        i--;
      }
      this.Humedad = Math.round(object.feeds[object.feeds.length - 1 - i].field2);
      data2.value = this.Humedad.toString();
      this.productoService.setHumedad(this.Humedad);
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
      if((this.Color&0xFF) >= 113){
        data3.pointers.pointer[0].value="17";
      }
      if((this.Color&0xFF) <= 36){
        data3.pointers.pointer[0].value="80";
      }

      if((this.Color&0xFF) > 36 && (this.Color&0xFF) < 113 ){
        data3.pointers.pointer[0].value="50";
      }
      this.productoService.setColor(this.Color);
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
      if (this.Gas >= 3500){
        data4.dials.dial[0].value='25';
      }
      if(this.Gas <= 3200){
        data4.dials.dial[0].value='80';
      }
      if(this.Gas > 3200 && this.Gas < 3500){
        data4.dials.dial[0].value='60';
      }
      this.productoService.setGas(this.Gas);
    });
  }

  GasMessage(): string{
    if (this.Gas >= 3500){
      return 'Bad';
    }
    if(this.Gas <= 3200){
      return 'Good';
    }
    if(this.Gas > 3200 && this.Gas < 3500){
      return 'Normal';
    }
  }

  GasColorMessage(): string{
    if (this.Gas >= 3500){
      return 'red';
    }
    if(this.Gas <= 3200){
      return 'green';
    }
    else{
      return 'orange';
    }
  }

  ColorMessage(): string{
    if ((this.Color&0xFF) >= 113){
      return 'Bad';
    }
    if((this.Color&0xFF) <= 36){
      return 'Good';
    }
    if((this.Color&0xFF) > 50 && (this.Color&0xFF) < 110 ){
      return 'Average';
    }
  }

  ColorColorMessage(): string{
    if (this.Color >= 3500){
      return 'red';
    }
    if(this.Color <= 3200){
      return 'green';
    }
    else{
      return 'orange';
    }
  }

  checkTemperature(): string{
    if(Math.abs(this.Temperatura-this.producto.temperaturaDeseada)<=2){
      return 'Estable';
    }
      else{
        return 'Inestable';
    }
  }

  checkHumedad(): string{
    if(Math.abs(this.Humedad-this.producto.humedadDeseada)<=2){
      return 'Estable';
    }
      else{
        return 'Inestable';
    }
  } 
}
