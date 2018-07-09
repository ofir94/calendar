import {Component, forwardRef, Inject, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController} from 'ionic-angular';
import {AddEventPage} from "../add-event/add-event";
import {ClientePage} from "../cliente/cliente";
import {DetallesPage} from "../detalles/detalles";
import {HomePage} from "../home/home";
import {DatabaseProvider} from "../../providers/database/database";
import { InformacionGeneralProvider } from '../../providers/informacionGeneral/informacionGeneral';
import { EvaluacionCulturalProvider } from '../../providers/evaluacionCultural/evaluacionCultural';
import { EstadoTecnicoConstructivoProvider } from '../../providers/estadoTecnicoConstructivo/estadoTecnicoConstructivo';
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
              private informacionGeneralProvider: InformacionGeneralProvider,
              private evaluacionCulturalProvider :EvaluacionCulturalProvider,
              public estadoTecnicoConstructivoProvider : EstadoTecnicoConstructivoProvider,




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

  


 
  updateInformacionGeneral(){
    this.databaseProvider.updateInformacionGeneral(

      this.informacionGeneralProvider.ionforamcionGeneral['nombre'],
      this.informacionGeneralProvider.ionforamcionGeneral['uso_general'],
      this.informacionGeneralProvider.ionforamcionGeneral['direccion'],
      this.informacionGeneralProvider.ionforamcionGeneral['num_pisos']
    )
  }

  addInformacionGeneral(){
    this.databaseProvider.addInformacionGeneral(

      this.informacionGeneralProvider.ionforamcionGeneral['fk_parcela'],      
      this.informacionGeneralProvider.ionforamcionGeneral['nombre'],
      this.informacionGeneralProvider.ionforamcionGeneral['uso_general'],
      this.informacionGeneralProvider.ionforamcionGeneral['direccion'],
      this.informacionGeneralProvider.ionforamcionGeneral['num_pisos']

    );
  }
  
  
  save() {

    try 
    {

      if (this.informacionGeneralProvider.ionforamcionGeneral.id_info_general != 0) {
        this.updateInformacionGeneral();
      }
      if(this.informacionGeneralProvider.ionforamcionGeneral.id_info_general == 0){
        this.addInformacionGeneral();
      }  

      this.navCtrl.popToRoot();
    }
      
    
    catch(err)
    {
      alert('error salvando EN TAB')
      console.log(err.message)
    }


    this.navCtrl.pop();
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
