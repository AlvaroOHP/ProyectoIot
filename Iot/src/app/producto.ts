export class Producto {
    constructor(
      public id: number,
      public nombre : string,
      public fruta: string,
      public activado: boolean,
      public ubicacion: string,
      public temperatura: number,
      public humedad: number,
      public gas: number,
      public color: number,
      public userId: number,
      public state: number,
      public temperaturaDeseada: number,
      public humedadDeseada: number,
      public temperaturaEstable: boolean,
      public humedadEstable: boolean
    ){}
    }