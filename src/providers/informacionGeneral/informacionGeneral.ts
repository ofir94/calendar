import { HttpClient } from '@angular/common/http';
import {forwardRef, Inject, Injectable} from '@angular/core';
import {DatabaseProvider} from "../database/database";
// import * as $ from "jquery";
// import {ClientProvider} from "../client/client";
import {AlertController} from "ionic-angular";
import { Observable } from "rxjs/Observable";


/*
  Generated class for the InformacionGeneral provider.

  See https://angular.io/guide/dependency-injection for more info on providers

*/
@Injectable()
export class InformacionGeneralProvider {
//Listas de tareas
 
  //Listas de tareas

  //Listas de realizadas
  

  allInformacionGeneral = [];

  ionforamcionGeneral = {
    id_info_general: 0,
    fk_parcela: 0,
    nombre: '',
    uso_general: "",
    direccion: "",
    num_pisos: ''
};


  // public clientProvider : ClientProvider;
  private alertCtrl: AlertController;

  constructor(public http: HttpClient,
              private databaseProvider: DatabaseProvider,
              // @Inject(forwardRef(() => ClientProvider)) clientProvider : ClientProvider,
              @Inject(forwardRef(() => AlertController)) alertCtrl : AlertController,
  ) {


    // this.clientProvider = clientProvider;
     // this.navCtrl = navCtrl;
    this.alertCtrl = alertCtrl;
    // this.informacionInitStatic();

    this.getAllInformacionGeneral();

  }

  informacionInitStatic(){

    this.allInformacionGeneral = [
      {
        id_info_general: 1,
        fk_parcela: 1,
        nombre: 'Cujae',
        uso_general: "Estudiar",
        direccion: "Lisa",
        num_pisos: '0',

      },
     {
        id_info_general: 2,
        fk_parcela: 2,
        nombre: 'Edificio',
        uso_general: "multi familiar",
        direccion: "Vista Hermosa entre Santa Ana y Concepción",
        num_pisos: '0',

      }, {
        id_info_general: 3,
        fk_parcela: 3,
        nombre: 'Bar',
        uso_general: "Borrachera",
        direccion: "10 entre 5ta A y 7ma",
        num_pisos: '0',

      }, {
        id_info_general: 4,
        fk_parcela: 4,
        nombre: 'Hard Rock',
        uso_general: "Spend all your money",
        direccion: 'Cancun, Tulum',
        num_pisos: '0',

      }, {
        id_info_general: 5,
        fk_parcela: 5,
        nombre: 'Las Americas',
        uso_general: "Comprar",
        direccion: 'Cancun, Tulum',
        num_pisos: '0',

      }/*, {
        id_reservation: 6,
        from_date: '2018-04-27',
        to_date: '2018-05-05',
        cantKid: "",
        cantAdult: "",
        location: 2,
        status: "3",
        price: 80,
        deposit: 0,
        id_client: "123",
        cant_bed_single: 0 ,
        cant_bed_double: 0,
        comment: "",
        id_room: 2,
        tarea:'Falta',

      }, {
        id_reservation: 7,
        from_date: '2018-04-28',
        to_date: '2018-04-30',
        cantKid: "",
        cantAdult: "",
        location: 2,
        status: "5",
        price: 0,
        deposit: 0,
        id_client: "asd",
        cant_bed_single: 0 ,
        cant_bed_double: 0,
        comment: "",
        id_room: 2,
        tarea:'Falta',

      },*/

    ]


  }
//Desde la bd
  getAllInformacionGeneral(){

    this.databaseProvider.getAllInformacionGeneral().then(data => {
      this.allInformacionGeneral = data;
     
      alert('getAllInformacionGeneral() en informacionGeneral.ts');
      alert(data[0]);
    });
  }

//Desde la bd



  getInformacionGeneralName(id) {

    for (let informacionGeneral of this.allInformacionGeneral){
      if (informacionGeneral.id_info_general == id) {
        return informacionGeneral.nombre;
      }
    }
  }

  getInformacionGeneralDireccion(id){

    for (let informacionGeneral of this.allInformacionGeneral){
      if (informacionGeneral.id_info_general == id) {
        return informacionGeneral.direccion;
      }
    }
  }

  // getRoomInnformacionGeneral(id_room){

  //     let roomInnformacionGeneral = [];
  //   for(let reserv of this.allInformacionGeneral){

  //     if(reserv.id_room == id_room){
  //          roomInnformacionGeneral.push(reserv)
  //     }
  //   }

  //   return roomInnformacionGeneral;
  // }





//   
  // async getClientById(id){


  //   try{

  //     let dats = await this.databaseProvider.getClientByIdAsync(id);


  //     this.clientProvider.client.id_client = dats[0].id_client;
  //     this.clientProvider.client.name = dats[0].name;
  //     this.clientProvider.client.address = dats[0].address;
  //     this.clientProvider.client.address2 = dats[0].address2;
  //     this.clientProvider.client.state = dats[0].state;
  //     this.clientProvider.client.postal_code = dats[0].postal_code;
  //     this.clientProvider.client.country = dats[0].country;
  //     this.clientProvider.client.passport = dats[0].passport;
  //     this.clientProvider.client.identification = dats[0].identification;
  //     this.clientProvider.client.phone = dats[0].phone;
  //     this.clientProvider.client.email = dats[0].email;


  //   }catch (err){
  //     console.log(err.message)
  //   }


  // }

  // getReservationById(id){



  //   for(let oneReservation of this.allInformacionGeneral){
  //     if(oneReservation.id_reservation == id) {

  //       return oneReservation;
  //     }
  //   }
  //   return null;
  // }

  // getReservationByIdAndRemoveItFromArray(id){


  //   let i = 0;
  //   for(let oneReservation of this.allInformacionGeneral){
  //     if(oneReservation.id_reservation == id) {
  //       this.allInformacionGeneral.splice(i,1);

  //       return oneReservation;
  //     }
  //     i = i+1;
  //   }
  //   return null;
  // }



  


  // loadCleaningData(){
  //   this.databaseProvider.getAllCleaning().then(data => {
  //     this.frequencys = data;

  //   });

  // }

  // loadFixedDayProfile(){
  //   this.databaseProvider.getProfile().then(data => {
  //     this.frequencys = data;

  //   });
  // }

}
