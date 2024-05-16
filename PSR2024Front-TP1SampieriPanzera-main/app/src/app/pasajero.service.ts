import { Injectable } from '@angular/core';
import { pasajero, vuelo } from './vuelo';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  constructor(private http: HttpClient){}

  protected listaPasajeros: pasajero[] = [
      
  ];

  getAllPasajero(idVuelo:number){
    return this.http.get('http://localhost:3000/vuelo/'+ idVuelo + '/pasajero')
  }

  getOnePasajero(idVuelo: number,mail: string){
    return this.http.get('http://localhost:3000/vuelo/' + idVuelo + '/pasajero/' + mail)
  }

  deletePasajero(idVuelo: number, mailPasajero: string | undefined){
    return this.http.delete('http://localhost:3000/vuelo/' + idVuelo +'/pasajero/' +mailPasajero)
  }

  addPasajero(idVuelo: number, body: any){
    return this.http.post('http://localhost:3000/vuelo/'+idVuelo+'/pasajero', body)
  }

  modificarPasajero(idVuelo: number, mailPasajero: string, body: any){
    return this.http.put('http://localhost:3000/vuelo/'+ idVuelo + '/pasajero/'+ mailPasajero, body)
  }

  mostrarPasajeros(): pasajero[]{
    return this.listaPasajeros;
  }

}
