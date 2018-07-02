import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import { InformacionGeneral } from '../../providers/informacionGeneral/informacionGeneral';
import {TabPage} from "../tab/tab";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = '';
  items = [];

  filterInformacionGeneral = [];
  allInnformacionGeneral = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public databaseProvider : DatabaseProvider,
              private alertCtrl:AlertController,
              public ionformacionGeneral : InformacionGeneral,

  ) {



    this.allInnformacionGeneral = this.ionformacionGeneral.allInnformacionGeneral;
    this.databaseProvider.loadPage = "SearchPage";

    this.initializeItems();
  }

  ionViewDidLoad() {

  }


  public closeModal(){
    this.viewCtrl.dismiss().then(e=>{
      this.databaseProvider.loadPage = "HomePage";

    });
  }


  initializeItems() {
    this.filterInformacionGeneral = this.ionformacionGeneral.allInnformacionGeneral;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set val to the value of the searchbar
    let val = ev.target.value;
  
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
  
      let tmp = [];
      for(let info of this.allInnformacionGeneral){
        if( this.getInformacionGeneralName(info.id_info_general).toLowerCase().indexOf(val.toLowerCase()) > -1){
          tmp.push(info)
        }
      }
  
      this.filterInformacionGeneral = tmp;
      /* this.filterReservation = this.filterReservation.filter((item) => {
         return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
       })*/
    }
  }
  
  getInformacionGeneralName(id){
    return this.ionformacionGeneral.getInformacionGeneralName(id);
  }


  // eliminarReserva(id_reservation, pos){

  //   let alerta = this.alertCtrl.create({
  //     title: 'Por favor confirmar',
  //     subTitle: '¿Quiere eliminar la reserva?',
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         handler: (data) => {
  //           console.log('cancel')
  //         }
  //       },
  //       {
  //         text: 'OK',
  //         handler: (data) => {

  //           this.reservationProvider.removeCanvas(id_reservation);
  //           this.filterReservation.splice(pos,1);

  //           this.deleteReservation(id_reservation);


  //         }
  //       }
  //     ]
  //   });
  //   alerta.present();
  // }

  // cambiarStatusReserva(id_reservation){

  //   try {
  //     let alerta = this.alertCtrl.create({
  //       title: 'Estado de reserva',
  //       inputs: [
  //         {
  //           type: 'radio',
  //           label: 'Falta de pago',
  //           value: '1',
  //           checked: true,
  //         },
  //         {
  //           type: 'radio',
  //           label: 'Depósito Pagado',
  //           value: '2'
  //         },
  //         {
  //           type: 'radio',
  //           label: 'Totalmente Pagada',
  //           value: '3'
  //         },
  //         {
  //           type: 'radio',
  //           label: 'Cancelado',
  //           value: '4'
  //         },
  //         {
  //           type: 'radio',
  //           label: 'No disponible',
  //           value: '5'
  //         }
  //       ],
  //       buttons: [
  //         {
  //           text: 'Cancelar',
  //           role: 'cancel',
  //           handler: (data) => {
  //             console.log('cancel')
  //           }
  //         },
  //         {
  //           text: 'OK',
  //           handler: (data) => {


  //             if (data != '1') {

  //               this.updateReservationStatus(id_reservation, data);
  //               this.reservationProvider.getAllReservation();

  //             }

  //           }
  //         }
  //       ]
  //     });
  //     alerta.present();

  //   }
  //   catch(err){
  //     console.log(err.message)
  //   }
  // }

  // deleteReservation(id_reservation){
  //   this.databaseProvider.deleteReservation(id_reservation).then(data => {
  //     this.reservationProvider.getAllReservation();
  //     this.filterReservation = this.reservationProvider.allReservations;

  //   });


  // }

  // updateReservationStatus(id_reservation,status){
  //   this.databaseProvider.updateReservationStatus(id_reservation, status).then(data => {
  //     this.reservationProvider.getAllReservation();
  //   });
  // }

  

 
  viewInformacionGeneral(reservation){ //Aqui poner la info general
  alert("Info de general");
  //   this.reservationProvider.reserva.id_reservation = reservation.id_reservation;
  //   this.reservationProvider.reserva.from_date = reservation.from_date;
  //   this.reservationProvider.reserva.to_date = reservation.to_date;
  //   this.reservationProvider.reserva.cantKid = reservation.cant_kid;
  //   this.reservationProvider.reserva.cantAdult = reservation.cant_adult;
  //   this.reservationProvider.reserva.location = reservation.id_room;
  //   this.reservationProvider.reserva.status = reservation.status;
  //   this.reservationProvider.reserva.price = reservation.price;
  //   this.reservationProvider.reserva.deposit = reservation.deposit;
  //   this.reservationProvider.reserva.id_client = reservation.id_client;
  //   this.reservationProvider.reserva.cant_bed_single = reservation.cant_bed_single;
  //   this.reservationProvider.reserva.cant_bed_double = reservation.cant_bed_double;
  //   this.reservationProvider.reserva.comment = reservation.comment;

  //   let client = this.clientProvider.getClientById(this.reservationProvider.reserva.id_client);

  //   this.clientProvider.client.id_client = client.id_client;
  //   this.clientProvider.client.name = client.name;
  //   this.clientProvider.client.address = client.address;
  //   this.clientProvider.client.address2 = client.address2;
  //   this.clientProvider.client.state = client.state;
  //   this.clientProvider.client.postal_code = client.postal_code;
  //   this.clientProvider.client.country = client.country;
  //   this.clientProvider.client.passport = client.passport;
  //   this.clientProvider.client.identification = client.identification;
  //   this.clientProvider.client.phone = client.phone;
  //   this.clientProvider.client.email = client.email;

  //   this.navCtrl.push(TabPage);

  }



}
