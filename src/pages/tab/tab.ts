import {Component, forwardRef, Inject, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController} from 'ionic-angular';
import {AddEventPage} from "../add-event/add-event";
import {ClientePage} from "../cliente/cliente";
import {DetallesPage} from "../detalles/detalles";
import {HomePage} from "../home/home";
import {DatabaseProvider} from "../../providers/database/database";
// import {ReservationProvider} from "../../providers/reservation/reservation";
// import {ClientProvider} from "../../providers/client/client";

/**
 * Generated class for the TabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html'
})
export class TabPage {
  @ViewChild(Navbar) navBar: Navbar;


  reservaRoot = AddEventPage;
  clienteRoot = ClientePage;
  detallesRoot = DetallesPage;
  // private reservationProvider : ReservationProvider;
  // private clientProvider : ClientProvider;

  constructor(public navCtrl: NavController,
              private databaseProvider: DatabaseProvider,
              private alertCtrl: AlertController,
              // @Inject(forwardRef(() => ReservationProvider)) reservationProvider : ReservationProvider,
              // @Inject(forwardRef(() => ClientProvider)) clientProvider : ClientProvider,

  ) {
    // this.reservation = this.navParams.data;

    // this.reservationProvider = reservationProvider;
    // this.clientProvider = clientProvider;

    this.databaseProvider.loadPage = "ReservationPage";


  }

  // addClient(){

  //   this.databaseProvider.addClient(
  //     this.clientProvider.client['name'],
  //     this.clientProvider.client['address'],
  //     this.clientProvider.client['address2'],
  //     this.clientProvider.client['state'],
  //     this.clientProvider.client['postal_code'],
  //     this.clientProvider.client['country'],
  //     this.clientProvider.client['passport'],
  //     this.clientProvider.client['identification'],
  //     this.clientProvider.client['phone'],
  //     this.clientProvider.client['email'],
  //     this.uuid
  //   );
  // }


  // addReservation(){

    // this.reservationProvider.reserva['id_client'] = this.uuid;
  /*  this.reservationProvider.reserva['comment'] = this.reservationProvider.reserva.comment;
    this.reservationProvider.reserva['cant_bed_single'] = this.reservationProvider.reserva.cant_bed_double;
    this.reservationProvider.reserva['cant_bed_double'] = this.reservationProvider.reserva.cant_bed_single;*/

  //   this.databaseProvider.addReservation(
  //     this.reservationProvider.reserva['from_date'],
  //     this.reservationProvider.reserva['to_date'],
  //     this.reservationProvider.reserva['cantAdult'],
  //     this.reservationProvider.reserva['cantKid'],
  //     this.reservationProvider.reserva['price'],
  //     this.reservationProvider.reserva['deposit'],
  //     this.reservationProvider.reserva['comment'],
  //     this.reservationProvider.reserva['cant_bed_single'],
  //     this.reservationProvider.reserva['cant_bed_double'],
  //     this.reservationProvider.reserva['location'],
  //     this.reservationProvider.reserva['status'],
  //     this.reservationProvider.reserva['tarea'],
  //   this.reservationProvider.reserva['id_client']
  //     );
  // }

  // updateClient(){

  //   this.databaseProvider.updateClient(
  //     this.clientProvider.client['name'],
  //     this.clientProvider.client['address'],
  //     this.clientProvider.client['address2'],
  //     this.clientProvider.client['state'],
  //     this.clientProvider.client['postal_code'],
  //     this.clientProvider.client['country'],
  //     this.clientProvider.client['passport'],
  //     this.clientProvider.client['identification'],
  //     this.clientProvider.client['phone'],
  //     this.clientProvider.client['email'],
  //     this.clientProvider.client['id_client'],

  //   );
  // }


  // updateReservation(){

  /*  this.reservationProvider.reserva['comment'] = this.reservationProvider.reserva.comment;

    this.reservationProvider.reserva['cant_bed_single'] = DetallesPage.detail.cant_bed_double;
    this.reservationProvider.reserva['cant_bed_double'] = DetallesPage.detail.cant_bed_single;*/

    // this.databaseProvider.updateReservation(
    //   this.reservationProvider.reserva['from_date'],
    //   this.reservationProvider.reserva['to_date'],
    //   this.reservationProvider.reserva['cantAdult'],
    //   this.reservationProvider.reserva['cantKid'],
    //   this.reservationProvider.reserva['price'],
    //   this.reservationProvider.reserva['deposit'],
    //   this.reservationProvider.reserva['comment'],
    //   this.reservationProvider.reserva['cant_bed_single'],
    //   this.reservationProvider.reserva['cant_bed_double'],
    //   this.reservationProvider.reserva['location'],
    //   this.reservationProvider.reserva['status'],
    //   this.reservationProvider.reserva['id_client'],
    //   this.reservationProvider.reserva['id_reservation']
    //   );
  // }


  // save() {

  //   try {


  //     let start = new Date(new Date(this.reservationProvider.reserva['from_date']).getTime()+1*24*60*60*1000);
  //     let end = new Date(new Date(this.reservationProvider.reserva['to_date']).getTime()+1*24*60*60*1000);
  //     let selectedId_Room = this.reservationProvider.reserva['location'];
  //     let id_reserv = this.reservationProvider.reserva.id_reservation;

  //     if(end <= start){

  //       let alerta = this.alertCtrl.create({
  //         title: 'Rango incorrecto',
  //         subTitle: 'La fecha en que culmina la reserva debe ser mayor que la fecha en que inicia',
  //         buttons: ['Aceptar']
  //       });
  //       alerta.present();
  //     }
  //     else {

  //       if (!this.availableDates(start, end, selectedId_Room, id_reserv)){

  //         let alerta = this.alertCtrl.create({
  //           title: 'Fecha ocupada',
  //           subTitle: 'Ya existe al menos una reserva realizada en el rango de fecha que usted desea añadir la nueva reservacion.',
  //           buttons: ['Aceptar']
  //         });
  //         alerta.present();

  //       }
  //       else {
  //         if (this.reservationProvider.reserva.id_reservation != 0) {

  //           this.updateClient();
  //           this.updateReservation();
  //           this.reservationProvider.removeCanvas(this.reservationProvider.reserva.id_reservation);
  //           this.reservationProvider.getAllReservation();
  //           this.clientProvider.getAllClients();
  //         }
  //         else {


  //           // this.addClient();
  //           this.addReservation();
  //           this.reservationProvider.getAllReservation();
  //           this.clientProvider.getAllClients();
  //         }

  //         // this.navCtrl.setRoot(HomePage);
  //         this.navCtrl.pop().then(e=>{
  //           this.databaseProvider.loadPage = "HomePage";
  //         });

  //       }
  //     }
  //   }
  //   catch(err){
  //     console.log('error salvando')
  //     console.log(err.message)
  //   }


  //   //this.navCtrl.pop();
  // }

  // availableDates(start, end, id_room, id_reserv){



  //   let reservRoom = this.reservationProvider.getRoomReservations(id_room);
  //   let bool = false;
  //   let canReserv = true;
  //   for(let i = 0; i<reservRoom.length && canReserv ; i++){

  //     if(id_reserv == reservRoom[i].id_reservation)
  //       bool = true;
  //     else {
  //       let startReserv = new Date(new Date(reservRoom[i].from_date).getTime() + 1 * 24 * 60 * 60 * 1000);
  //       let endReserv = new Date(new Date(reservRoom[i].to_date).getTime() + 1 * 24 * 60 * 60 * 1000);

  //       bool = this.checkAvaibility(start, end, startReserv, endReserv);

  //       if (!bool)
  //         canReserv = false;
  //     }
  //   }

  //   if(bool || reservRoom.length == 0)
  //    return true;
  //   else
  //     return false;



  // }


  checkAvaibility(from_day_filter, to_day_filter,from_date_reserv,to_date_reserv){

    from_day_filter.setHours(0,0,0,0);
    to_day_filter.setHours(0,0,0,0);

    let fecha_from_day_filter = from_day_filter.getTime();
    let fecha_to_day_filter = to_day_filter.getTime();


    let fromDate =  new Date(from_date_reserv);

    fromDate.setHours(0,0,0,0);

    let from = (fromDate.getTime());

    let toDate = new Date(to_date_reserv);

    toDate.setHours(0,0,0,0);
    let to = (toDate.getTime());

    if((from >= fecha_from_day_filter && from<fecha_to_day_filter) ||
      (to > fecha_from_day_filter && to<=fecha_to_day_filter)){
      return false;
    }
    else{
      if((fecha_from_day_filter >= from && fecha_from_day_filter<to) ||
        (fecha_to_day_filter > from && fecha_to_day_filter<=to))
        return false

      else
        return true;

    }



  }


  ionViewDidLoad(){
    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something

      this.navCtrl.popTo(HomePage).then(ex=> {
        this.databaseProvider.loadPage = "HomePage";
      });
    }
  }

}
