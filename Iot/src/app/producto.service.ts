import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos: Producto[] = [
    new Producto(1, 'Plátanos CAJA 1', 'Plátano', true, 'Tienda Abarrotes', 20, 20, 20, 20, 2, 1 ,23, 25, true,true),
    new Producto(2, 'Plátanos CAJA 2', 'Plátano', true, 'Tienda Abarrotes', 20, 24, 4000, 20, 2, 1,23, 25 , true,false),
    new Producto(3, 'Plátanos CASA 1', 'Plátano', true, 'Casa ', 20, 20, 20, 20, 2, 2, 23, 25, true,true),
    new Producto(4, 'Tomates CAJA 1', 'Tomate', true, 'Tienda Abarrotes', 20, 20, 20, 20, 2, 2, 23, 25, true,false),
    new Producto(5, 'Tomates CAJA 2', 'Tomate', true, 'Tienda Abarrotes', 20, 20, 20, 20, 2, 2, 23, 25, true,true),
    new Producto(6, 'Plátanos CASA 2', 'Plátano', true, 'Casa', 20, 20, 20, 20, 2, 3, 23, 25, true,true),
  ];
  constructor(private http: HttpClient) { }

  getProductos(): Producto[] {
    return this.productos.slice();
  }

  setTemperature(temp: number){
    this.productos[0].temperatura= temp;
  }

  setHumedad(hum: number){
    this.productos[0].humedad= hum;
  }

  setTemperaturaState(state: boolean){
    this.productos[0].temperaturaEstable = state;
  }

  setHumedadState(state: boolean){
    this.productos[0].humedadEstable = state;
  }

  setGas(gas: number){
    this.productos[0].gas= gas;
  }

  setColor(color: number){
    this.productos[0].color = color;
  }


  getProductobyId(id:number) {
  const pro= this.productos.find(pro => pro.id == id);
  return pro;
  }

  
}
