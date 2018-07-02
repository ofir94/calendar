import { HttpClient } from '@angular/common/http';
import {forwardRef, Inject, Injectable} from '@angular/core';
import {DatabaseProvider} from "../database/database";
import * as $ from "jquery";
// import {ClientProvider} from "../client/client";
import {AlertController} from "ionic-angular";
import { Observable } from "rxjs/Observable";


/*
  Generated class for the InformacionGeneral provider.

  See https://angular.io/guide/dependency-injection for more info on providers

*/
@Injectable()
export class InformacionGeneral {
//Listas de tareas
  reservasLlegan = [];
  reservasSalen = [];
  reservasFaltaPago = [];
  limpiezas = [];
  //Listas de tareas

  //Listas de realizadas
  reservasRealizadasSalen = [];
  reservasRealizadasLlegan = [];
  limpiezasRealizadas = [];
  //Listas de realizadas

  frequencys = [];

  fixed_day;

  allInnformacionGeneral = [];

  ionforamcionGeneral = {
    id_info_general: 0,
    fk_parcela: 0,
    nombre: '',
    uso_general: "",
    direccion: "",
    num_pisos: 0
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
    console.log('Hello ReservationProvider Provider');


  }

  // reservInitStatic(){

  //   this.allInnformacionGeneral = [
  //     {
  //       id_reservation: 1,
  //       from_date: '2018-04-30',
  //       to_date: '2018-05-17',
  //       cantKid: "",
  //       cantAdult: "",
  //       location: 1,
  //       status: "1",
  //       price: 50,
  //       deposit: 10,
  //       id_client: "asd",
  //       cant_bed_single: 0 ,
  //       cant_bed_double: 0,
  //       comment: "",
  //       id_room: 1,
  //       tarea:'Falta',

  //     },
  //    /* {
  //       id_reservation: 2,
  //       from_date: '2018-04-27',
  //       to_date: '2018-04-28',
  //       cantKid: "",
  //       cantAdult: "",
  //       location: 4,
  //       status: "1",
  //       price: 10,
  //       deposit: 10,
  //       id_client: "zxc",
  //       cant_bed_single: 0 ,
  //       cant_bed_double: 0,
  //       comment: "",
  //       id_room: 4,
  //       tarea:'Falta',

  //     }, {
  //       id_reservation: 3,
  //       from_date: '2018-04-28',
  //       to_date: '2018-04-30',
  //       cantKid: "",
  //       cantAdult: "",
  //       location: 4,
  //       status: "2",
  //       price: 10,
  //       deposit: 20,
  //       id_client: "zxc",
  //       cant_bed_single: 0 ,
  //       cant_bed_double: 0,
  //       comment: "",
  //       id_room: 4,
  //       tarea:'Falta',

  //     }, {
  //       id_reservation: 4,
  //       from_date: '2018-04-25',
  //       to_date: '2018-04-28',
  //       cantKid: "",
  //       cantAdult: "",
  //       location: 3,
  //       status: "1",
  //       price: 20,
  //       deposit: 31,
  //       id_client: "123",
  //       cant_bed_single: 0 ,
  //       cant_bed_double: 0,
  //       comment: "",
  //       id_room: 4,
  //       tarea:'Falta',

  //     },*/ {
  //       id_reservation: 5,
  //       from_date: '2018-04-28',
  //       to_date: '2018-05-17',
  //       cantKid: "",
  //       cantAdult: "",
  //       location: 3,
  //       status: "4",
  //       price: 12,
  //       deposit: 0,
  //       id_client: "456",
  //       cant_bed_single: 0 ,
  //       cant_bed_double: 0,
  //       comment: "",
  //       id_room: 3,
  //       tarea:'Falta',

  //     }/*, {
  //       id_reservation: 6,
  //       from_date: '2018-04-27',
  //       to_date: '2018-05-05',
  //       cantKid: "",
  //       cantAdult: "",
  //       location: 2,
  //       status: "3",
  //       price: 80,
  //       deposit: 0,
  //       id_client: "123",
  //       cant_bed_single: 0 ,
  //       cant_bed_double: 0,
  //       comment: "",
  //       id_room: 2,
  //       tarea:'Falta',

  //     }, {
  //       id_reservation: 7,
  //       from_date: '2018-04-28',
  //       to_date: '2018-04-30',
  //       cantKid: "",
  //       cantAdult: "",
  //       location: 2,
  //       status: "5",
  //       price: 0,
  //       deposit: 0,
  //       id_client: "asd",
  //       cant_bed_single: 0 ,
  //       cant_bed_double: 0,
  //       comment: "",
  //       id_room: 2,
  //       tarea:'Falta',

  //     },*/

  //   ]


  // }

  getAllInformacionGeneral(){

    this.databaseProvider.getAllInformacionGeneral().then(data => {
      this.allInnformacionGeneral = data;
     

    });
  }

  getInformacionGeneralName(id) {

    for (let informacionGeneral of this.allInnformacionGeneral){
      if (informacionGeneral.id_info_general == id) {
        return informacionGeneral.nombre;
      }
    }
  }


  getRoomInnformacionGeneral(id_room){

      let roomInnformacionGeneral = [];
    for(let reserv of this.allInnformacionGeneral){

      if(reserv.id_room == id_room){
           roomInnformacionGeneral.push(reserv)
      }
    }

    return roomInnformacionGeneral;
  }



  initPaint(startDate,endDate,status,id_room){
    let start = new Date(new Date(startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(endDate).getTime()+1*24*60*60*1000);
    let idStart = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
    let idEnd = end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
    let cantDias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

    let idCanvas;
    let habitacion = "#hab"+id_room;

    for(let i = 0; i < cantDias+1;i++){

      if( i == 0 ){


        idCanvas = $(habitacion +"-"+ idStart).children('canvas').attr('id');
        $(habitacion +"-"+ idStart).attr('reservado','reservado');
        $(habitacion +"-"+ idStart).attr("id_room", id_room);
        $(habitacion +"-"+ idStart).attr('fecha',idStart);
        $(habitacion +"-"+ idStart).attr('inicio', 'inicio');

        this.pintarTrianguloInicio(status,idCanvas);

      }
      if( i == cantDias){
        // alert("End Day:"+endDate);
        idCanvas = $(habitacion +"-"+ idEnd).children('canvas').attr('id');
        $(habitacion +"-"+ idEnd).attr('reservado','reservado');
        $(habitacion +"-"+ idEnd).attr("id_room", id_room);
        $(habitacion +"-"+ idEnd).attr('fecha',idEnd);
        $(habitacion +"-"+ idEnd).attr('fin', 'fin');

        this.pintarTrianguloFin(status,idCanvas);
      }
      if( i != 0 && i != cantDias){

        let currentDay = new Date(new Date(startDate).getTime() + (i+1)*24*60*60*1000);//la i es para sumar los dias intermedios del evento
        let idCurrentDay =  currentDay.getFullYear()+"-"+currentDay.getMonth()+"-"+currentDay.getDate();
        idCanvas = $(habitacion +"-"+ idCurrentDay).children('canvas').attr('id');
        $(habitacion +"-"+ idCurrentDay).attr('reservado','reservado');
        $(habitacion +"-"+ idCurrentDay).attr("id_room", id_room);
        $(habitacion +"-"+ idCurrentDay).attr('fecha',idCurrentDay);
        this.pintarCuadrado(status,idCanvas);

      }

    }
  //  AddEventPage.style = 'falta_pago';
    // alert(this.reservasionCreada.startDate);
    // alert(this.reservasionCreada.endDate);
  }


  pintarCuadrado(status,id) {

    let color = this.color(status);

    var c1 : any = document.getElementById(id);

    if(c1 != null){
      var ctxs1 = c1.getContext("2d");
      ctxs1.beginPath();
      ctxs1.moveTo(0, 0);
      ctxs1.lineTo(0,145);
      ctxs1.lineTo(145,145);
      ctxs1.lineTo(300,145);
      ctxs1.lineTo(300,0);
      ctxs1.fillStyle = color;
      ctxs1.fill();
    }
  }




  pintarTrianguloInicio(status,id){

    let color = this.color(status);

    var c3: any = document.getElementById(id);

    if(c3 != null) {

      var ctxs3 = c3.getContext("2d");

      ctxs3.beginPath();
      ctxs3.moveTo(20, 145);
      ctxs3.lineTo(300, 145);
      ctxs3.lineTo(300, 0);
      ctxs3.fillStyle = color;

      ctxs3.fill();
    }

  }

  pintarTrianguloFin(status,id){

    let color = this.color(status);

    var c2 : any = document.getElementById(id);

    if(c2 != null) {

      var ctxs2 = c2.getContext("2d");

      ctxs2.beginPath();
      ctxs2.moveTo(280, 0);
      ctxs2.lineTo(0, 0);
      ctxs2.lineTo(0, 145);
      ctxs2.fillStyle = color;
      ctxs2.fill();

    }

  }

  color(status){

    let color;


    if(status == "1" ){
      color = 'rgb(255, 152, 134)';
    }
    if(status == "2"){
      color = '#c2c33e';
    }
    if(status ==  "3") {
      color = '#32db64';
    }
    if(status ==  "4") {
      color = '#84607f';
    }
    if(status ==  "5"){
      color = '#f53d3d';
    }


    return color;
  }



clearCanvas(){

}


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


  tranformarFechaAStringStart(day){
    day.setHours(0,0,0,0);
    let fecha = new Date(new Date(day).getTime()).toISOString();
    let split = fecha.toString().split('T')[0];
    return split;
  }

  tranformarFechaAStringEnd(day) {
    day.setHours(0,0,0,0);
    let diaMas = 1 * 24 * 60 * 60 * 1000;
    let fecha = new Date(new Date(day).getTime() + diaMas).toISOString();
    let split = fecha.toString().split('T')[0];
    return split;
  }


  dateBetweenInitAndEnd(day,from_date,to_date){

    let diaMas = (1 * 24 * 60 * 60 * 1000);

    day.setHours(0,0,0,0);
    let fecha = day.getTime();

    // alert("Dia clickeado: " + day);
    let fromDate =  new Date(from_date);

    fromDate.setHours(0,0,0,0);
    console.log(fromDate)
    let from = (fromDate.getTime() + diaMas);
    console.log(from)
    let toDate = new Date(to_date);

    toDate.setHours(0,0,0,0);
    let to = (toDate.getTime() + diaMas);

  /*  alert(from);

    alert(fecha >= from && fecha <= to)

    alert("fecha: "+ fecha+ " fromDate: "+from+" toDate: "+to)*/

    if(fecha >= from && fecha <= to){
      return true;
    }
    else{
      return false;
    }
  }

  getReservationById(id){



    for(let oneReservation of this.allInnformacionGeneral){
      if(oneReservation.id_reservation == id) {

        return oneReservation;
      }
    }
    return null;
  }

  getReservationByIdAndRemoveItFromArray(id){


    let i = 0;
    for(let oneReservation of this.allInnformacionGeneral){
      if(oneReservation.id_reservation == id) {
        this.allInnformacionGeneral.splice(i,1);

        return oneReservation;
      }
      i = i+1;
    }
    return null;
  }



  removeCanvas(id_reservation){

    let reserv = this.getReservationByIdAndRemoveItFromArray(id_reservation);

    let startDate = reserv.from_date;
    let endDate = reserv.to_date;
    let id_room = reserv.id_room;

    let start = new Date(new Date(startDate).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(endDate).getTime()+1*24*60*60*1000);
    let idStart = start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate();
    let idEnd = end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
    let cantDias = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

    let idCanvas;
    let habitacion = "#hab"+id_room;
    // console.log($("#hab1-" + idStart).children('canvas').attr('idCanvas'))
    //  idCanvas = $("#hab1-" + idStart).children('canvas').attr('idCanvas');
    //  this.pintarTrianguloInicio(status,idCanvas);
    for(let i = 0; i < cantDias+1;i++){

      if( i == 0 ){

        // alert(habitacion +"-"+ idStart);
        idCanvas = $(habitacion +"-"+ idStart).children('canvas').attr('id');
        $(habitacion +"-"+ idStart).attr('reservado','reservado');
        $(habitacion +"-"+ idStart).attr("id_room", id_room);
        $(habitacion +"-"+ idStart).attr('fecha',idStart);
        $(habitacion +"-"+ idStart).attr('inicio', 'inicio');

        let c3: any = document.getElementById(idCanvas);

        if(c3 != null) {

          let ctxs3 = c3.getContext("2d");

          ctxs3.clearRect(0,0,300,145);

        }

      }
      if( i == cantDias){
        // alert("End Day:"+endDate);
        idCanvas = $(habitacion +"-"+ idEnd).children('canvas').attr('id');
        $(habitacion +"-"+ idEnd).attr('reservado','reservado');
        $(habitacion +"-"+ idEnd).attr("id_room", id_room);
        $(habitacion +"-"+ idEnd).attr('fecha',idEnd);
        $(habitacion +"-"+ idEnd).attr('fin', 'fin');

        let c3: any = document.getElementById(idCanvas);

        if(c3 != null) {

          let ctxs3 = c3.getContext("2d");

          ctxs3.clearRect(0,0,300,145);

        }
      }
      if( i != 0 && i != cantDias){

        let currentDay = new Date(new Date(startDate).getTime() + (i+1)*24*60*60*1000);//la i es para sumar los dias intermedios del evento
        let idCurrentDay =  currentDay.getFullYear()+"-"+currentDay.getMonth()+"-"+currentDay.getDate();
        idCanvas = $(habitacion +"-"+ idCurrentDay).children('canvas').attr('id');
        $(habitacion +"-"+ idCurrentDay).attr('reservado','reservado');
        $(habitacion +"-"+ idCurrentDay).attr("id_room", id_room);
        $(habitacion +"-"+ idCurrentDay).attr('fecha',idCurrentDay);

        let c3: any = document.getElementById(idCanvas);

        if(c3 != null) {

          let ctxs3 = c3.getContext("2d");

          ctxs3.clearRect(0,0,300,145);

        }

      }

    }

  }


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
