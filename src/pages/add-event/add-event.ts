import { Component, Inject, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

// import * as $ from "jquery";
// import {ReservationProvider} from "../../providers/reservation/reservation";
// import {RoomProvider} from "../../providers/room/room";


/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  developer = {};

  // private reservationProvider : ReservationProvider;
  // private roomProvider : RoomProvider;

  event = { id_reservation: 0,
            from_date: '',
            to_date: '',
            cantKid: '',
            cantAdult: 1,
            location: '',
            status: '',
            price: 0,
            deposit: 0,
            id_client: '',
            cant_bed_single: 0 ,
            cant_bed_double: 0,
            comment: '',
            id_room: 0,
            tarea: ''
          };
 startDate;


  room = {id_room : '',name : '',cant_people: 0,cant_bed_aditional: 0,cant_bed_single: 0,cant_bed_double : 0,view_order:0}
  rooms = [];
  selectOptions;
  static style = 'falta_pago';

  //Checked
  falta_pago_checked = true;
  deposito_pagado_checked = false;
  totalmente_pagado_checked = false;
  cancelado_checked = false;
  no_disponible_checked = false;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private databaseProvider: DatabaseProvider,
              // @Inject(forwardRef(() => RoomProvider)) roomProvider : RoomProvider,
              // @Inject(forwardRef(() => ReservationProvider)) reservationProvider : ReservationProvider,

              )
  {

    // this.roomProvider = roomProvider;
    // this.reservationProvider= reservationProvider;

    // this.event = {  id_reservation: this.reservationProvider.reserva.id_reservation,
    //                 from_date: this.reservationProvider.reserva.from_date,
    //                 to_date: this.reservationProvider.reserva.to_date,
    //                 cantKid: this.reservationProvider.reserva.cantKid,
    //                 cantAdult: this.reservationProvider.reserva.cantAdult,
    //                 location: this.reservationProvider.reserva.location,
    //                 status: this.reservationProvider.reserva.status,
    //                 price: this.reservationProvider.reserva.price,
    //                 deposit: this.reservationProvider.reserva.deposit,
    //                 id_client: this.reservationProvider.reserva.id_client,
    //                 cant_bed_single: this.reservationProvider.reserva.cant_bed_single ,
    //                 cant_bed_double: this.reservationProvider.reserva.cant_bed_double,
    //                 comment: this.reservationProvider.reserva.comment,
    //                 id_room: this.reservationProvider.reserva.id_room,
    //                 tarea: this.reservationProvider.reserva.tarea
    //               };




    // this.reservationProvider.reserva = this.event;
    // this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo
    //   mode: 'md'
    // };


    // this.rooms = this.roomProvider.allRooms;

    this.ininicializarEstado();

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  pintar_nav(style,value){
    // $("#navbar_evento").attr('class','toolbar toolbar-md');
    // $("#navbar_evento").addClass('toolbar-md-'+style);
    this.event.status = value;
    AddEventPage.style = style;


  }


  calcularPrecio() {

    // document.getElementById("precioFinal").setAttribute("ng-reflect-model", "5");
    let start = new Date(new Date(this.event.from_date).getTime()+1*24*60*60*1000);
    let end = new Date(new Date(this.event.to_date).getTime()+1*24*60*60*1000);





  }

  //VALIDACION
  // buildForm() {
  //   this.formularioEvento = this.fb.group({
  //     precio:['',[Validators.required,Validators.maxLength(30)]],
  //
  //   });
  // }


  // ESTATICO
  // getAllRooms(){
  //   let room1 =  {id: '1', name:'room1'}
  //   let room2 =  {id: '2', name:'room2'};
  //   this.rooms = [room1,room2];
  //
  // }
  // ESTATICO


  ininicializarEstado(){
    if(this.event.status == "1"){
      this.falta_pago_checked = true;
      this.deposito_pagado_checked= false;
      this.totalmente_pagado_checked = false;
      this.cancelado_checked = false;
      this.no_disponible_checked = false;


      this.pintar_nav('falta_pago',this.event.status);

    }
    if(this.event.status == "2"){
      this.falta_pago_checked = false;
      this.deposito_pagado_checked= true;
      this.totalmente_pagado_checked = false;
      this.cancelado_checked = false;
      this.no_disponible_checked = false;



      this.pintar_nav('deposito_pagado',this.event.status);

    }
    if(this.event.status == "3"){
      this.falta_pago_checked = false;
      this.deposito_pagado_checked= false;
      this.totalmente_pagado_checked = true;
      this.cancelado_checked = false;
      this.no_disponible_checked = false;
      this.pintar_nav('secondary',this.event.status);

    }
    if(this.event.status == "4"){
      this.falta_pago_checked = false;
      this.deposito_pagado_checked= false;
      this.totalmente_pagado_checked = false;
      this.cancelado_checked = true;
      this.no_disponible_checked = false;
      this.pintar_nav('cancelado',this.event.status);

    }
    if(this.event.status == "5"){
      this.falta_pago_checked = false;
      this.deposito_pagado_checked= false;
      this.totalmente_pagado_checked = false;
      this.cancelado_checked = false;
      this.no_disponible_checked = true;
      this.pintar_nav('danger',this.event.status);

    }

  }
}
