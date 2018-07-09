import { Component, Inject, forwardRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import { InformacionGeneralProvider } from '../../providers/informacionGeneral/informacionGeneral';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  base64Image:any;
  // private reservationProvider : ReservationProvider;
  // private roomProvider : RoomProvider;

  informacionGeneral = { 
                            
  };
 
  ionforamcionGeneral = {
    id_info_general: 0,
    fk_parcela: 0,
    nombre: '',
    uso_general: "",
    direccion: "",
    num_pisos: ''
};

  selectOptions;

  //Checked


  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private databaseProvider: DatabaseProvider,
              private informacionGeneralProvider: InformacionGeneralProvider,
              private camera: Camera
              // @Inject(forwardRef(() => RoomProvider)) roomProvider : RoomProvider,
              // @Inject(forwardRef(() => ReservationProvider)) reservationProvider : ReservationProvider,

              )
  {
    this.selectOptions = {//para poder ponerle un evento al ok del alert para poner habitacionn1 como titulo
    mode: 'md'
  };

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

    this.ininicializarInformacionGeneral();
    this.informacionGeneralProvider.ionforamcionGeneral = this.ionforamcionGeneral;

  }


  ininicializarInformacionGeneral(){
    this.ionforamcionGeneral.id_info_general = this.informacionGeneralProvider.ionforamcionGeneral.id_info_general;
    this.ionforamcionGeneral.fk_parcela= this.informacionGeneralProvider.ionforamcionGeneral.fk_parcela;
    this.ionforamcionGeneral.nombre= this.informacionGeneralProvider.ionforamcionGeneral.nombre;
    this.ionforamcionGeneral.uso_general= this.informacionGeneralProvider.ionforamcionGeneral.uso_general;
    this.ionforamcionGeneral.direccion= this.informacionGeneralProvider.ionforamcionGeneral.direccion;
    this.ionforamcionGeneral.num_pisos= this.informacionGeneralProvider.ionforamcionGeneral.num_pisos;
  
  }

 openCamera(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });
 }

 cargarfoto(){


  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false

  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });
 }

  
}
