import { Injectable } from '@angular/core';
import { vuelo } from './vuelo';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
  })

  export class vueloServicio {

    nombre: string | undefined
    apellido: string | undefined;
    mail: string | undefined

    constructor(private http: HttpClient){}

    protected listaVuelos: vuelo[] = [
      
    ];

    getAllVuelos(){
      return this.http.get('http://localhost:3000/vuelo')
    }

    getOneVuelo(id: number){
      return this.http.get('http://localhost:3000/vuelo/' + id)
    }

    deleteVuelo(idVuelo: number | undefined){
      return this.http.delete('http://localhost:3000/vuelo/' + idVuelo)
    }

    addVuelo(body: any){
      return this.http.post('http://localhost:3000/vuelo', body)
    }

    modificarVuelo(id: number, body: any){
      return this.http.put('http://localhost:3000/vuelo/'+id, body)
    }


    obtenerTodosLosVuelos(): vuelo[] {
      return this.listaVuelos;
    }
  
    obtenerVueloPorId(id: number): vuelo | undefined {
      return this.listaVuelos.find(vuelo => vuelo.id === id);
    }
  
    enviar(firstName: string, lastName: string, email: string) {
      this.nombre=firstName
      this.apellido=lastName
      this.mail=email
    }
  }