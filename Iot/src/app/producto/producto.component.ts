import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Producto } from '../producto';
import { ProductoListaComponent } from '../producto-lista/producto-lista.component';
import { DataServiceService } from '../data-service.service';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;
  badState: boolean;
  interval: any;
  constructor(
    public  productoLista: ProductoListaComponent,
    public dataservice: DataServiceService) { }

  ngOnInit() {
    this.BadState();
    this.interval = setInterval(() => {
      this.Test();
      this.getState();
      this.checkTempAndHum();
  }, 1500);
  }


   getState(): object {
    console.log(this.producto.state)
    if (this.producto.state === 1){
    return { "background-color": "green" };
    }
    else if (this.producto.state === 2) {
    return { "background-color": "red" };
    }
    if (this.producto.state === 3){
      return { "background-color": "orange" };
    }

  }

 
  BadState(){ 
    if(this.producto.state === 2){
      this.badState = true;
    }
  }

  getFruitImage(): string{
    if(this.producto.fruta == 'Plátano'){
      return 'https://www.kipupress.com/wp-content/uploads/2019/08/Bananas.jpg'
    }
    if(this.producto.fruta == 'Tomate'){
      return 'https://www.eleconomista.com.mx/__export/1565191860179/sites/eleconomista/img/2019/08/07/tomates.jpg_1348255499.jpg'
    }
  }

  Test(){
    if(this.producto.gas >= 3500 || (this.producto.color&0xFF) >= 113) {
      this.badState = true;
      this.producto.state=2;
      return;
    }
    if(this.producto.gas <= 3200 )
    {
      this.badState = false;
      this.producto.state = 1;
      return;
    }
    else if(this.producto.gas > 3200 && this.producto.gas < 3500){
      this.producto.state= 3;
      return;
    }


  }
  checkTempAndHum(){
    console.log("Ffds");

    if(Math.abs(this.producto.temperatura-this.producto.temperaturaDeseada)<= 2 && this.producto.state!=2){
      this.producto.temperaturaEstable = true;
      
    }
      else if (Math.abs(this.producto.temperatura-this.producto.temperaturaDeseada)> 2 && this.producto.state!=2){
        this.producto.temperaturaEstable= false;
        this.producto.state=3;
      }
    if(Math.abs(this.producto.humedad-this.producto.humedadDeseada)<= 2 && this.producto.state!=2){
      this.producto.humedadEstable = true;
      
    }else if (Math.abs(this.producto.humedad-this.producto.humedadDeseada)<= 2 && this.producto.state!=2){
      this.producto.humedadEstable = false;
      this.producto.state=3; 
    }
  }


}
