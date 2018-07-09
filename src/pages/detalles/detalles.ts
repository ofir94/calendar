import {Component, forwardRef, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { EstadoTecnicoConstructivoProvider } from '../../providers/estadoTecnicoConstructivo/estadoTecnicoConstructivo';
import { InformacionGeneralProvider } from '../../providers/informacionGeneral/informacionGeneral';
import { DatabaseProvider } from '../../providers/database/database';
import { EstadoTecnicoConstructivoPage } from '../estado-tecnico-constructivo/estado-tecnico-constructivo';
// import {ReservationProvider} from "../../providers/reservation/reservation";

/**
 * Generated class for the DetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html',
})
export class DetallesPage {

  allEstadoTecnicoConstructivo = [];
  estadoTecnicoConstructivo = {
    id_etc: 0,
    fk_parcela: 0,
    elem_construct: 0,
    caract_mater: "",
    modif: "",
    lesiones: "",
    localizacion: "",
    buen_estado: 0.0,
    leve: 0.0,
    grave: 0.0,
    muy_grave: 0.0,

}

  elementoConstructivo = {
    id_ec: 0,
    elem_construct: ""
  }
  allElementoConstructivo = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public estadoTecnicoConstructivoProvider : EstadoTecnicoConstructivoProvider,
              private databaseProvider: DatabaseProvider,
              public modalCtrl: ModalController,
              public alertCtrl : AlertController,


              
              // @Inject(forwardRef(() => ReservationProvider)) reservationProvider : ReservationProvider,


  ) {

  
    this.allEstadoTecnicoConstructivo =  this.estadoTecnicoConstructivoProvider.allEstadoTecnicoConstructivoParaUnEdificio;

    // this.reservationProvider = reservationProvider;

    // this.detalles = {
    //   comment: this.reservationProvider.reserva.comment,
    //   cant_bed_single:  this.reservationProvider.reserva.cant_bed_single,
    //   cant_bed_double: this.reservationProvider.reserva.cant_bed_double
    // };


    //           DetallesPage.detail = this.detalles;

    // this.reservationProvider.reserva.comment = this.detalles.comment;
    // this.reservationProvider.reserva.cant_bed_single = this.detalles.cant_bed_single;
    // this.reservationProvider.reserva.cant_bed_single = this.detalles.cant_bed_single;
  }

  

// bd
// inicializarElementosConstructivos(){
//   this.databaseProvider.getAllEstadoTecnicoConstructivo().then(data => {
//     this.allElementoConstructivo = data;
//   });
// }
// bd


inicializarElementosConstructivosStatic(){
  this.allElementoConstructivo = [
    {
      id_ec: 1,
      elem_construct: "Cimentación"
    },
    {
      id_ec: 2,
      elem_construct: "Estructura Vertical"
    },
    {
      id_ec: 3,
      elem_construct: "Estructura Horizontal"
    },
    {
      id_ec: 4,
      elem_construct: "Escaleras y rampas"
    },
    {
      id_ec: 5,
      elem_construct: "Cerramientos"
    },
    {
      id_ec: 6,
      elem_construct: "Voladizos y elementos singulares"
    },
  ]
}

viewEstadoTecnicoConstructivo(estadoTecnicoConstructivo){
  alert(estadoTecnicoConstructivo.id_etc);
  let modal = this.modalCtrl.create(EstadoTecnicoConstructivoPage);

  this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo = estadoTecnicoConstructivo;

  modal.present();
}
//  inicializarEstadoTecnicoConstructivo(){
   


//   this.estadoTecnicoConstructivo.id_etc = this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.id_etc;
//   this.estadoTecnicoConstructivo.fk_parcela= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.fk_parcela;
//   this.estadoTecnicoConstructivo.elem_construct= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.elem_construct;
//   this.estadoTecnicoConstructivo.caract_mater =this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.caract_mater;
//   this.estadoTecnicoConstructivo.modif= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.modif;
//   this.estadoTecnicoConstructivo.lesiones= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.lesiones;
//   this.estadoTecnicoConstructivo.localizacion= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.localizacion;
//   this.estadoTecnicoConstructivo.buen_estado= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.buen_estado;
//   this.estadoTecnicoConstructivo.leve= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.leve;
//   this.estadoTecnicoConstructivo.grave= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.grave;
//   this.estadoTecnicoConstructivo.muy_grave= this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.muy_grave;
// }
  
// findElemntoConstructivoById(id){
//   let result;
//   for(let ec of this.allElementoConstructivo){
//     if(ec.id_ec == id){
//       result = ec.elem_construct;
//     }
//   }
//   return result;
// }
// llenarElementoConstructivoString(){
//   for(let ec of this.allEstadoTecnicoConstructivo){
//     ec.elem_construct_string = this.findElemntoConstructivoById(ec.id_etc);
//   }
  
// }

crearETC(){
  let modal = this.modalCtrl.create(EstadoTecnicoConstructivoPage);
  modal.present();

}

eliminarETC(etc,i){

  let alerta = this.alertCtrl.create({
    title: 'Eliminar',
    subTitle: "Está seguro que desea eliminar?",
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: (data) => {
          //console.log('cancel')
        }
      },
      {
        text: 'Aceptar',
        handler: (data) => {
          this.estadoTecnicoConstructivoProvider.allEstadoTecnicoConstructivoParaUnEdificio.splice(i,1); 


          // this.deleteEstadoTecnicoConstructivo(etc.id_etc);
      

        }
      }
    ]
  });
  alerta.present();
}

deleteEstadoTecnicoConstructivo(id_etc){
  this.databaseProvider.deleteEstadoTecnicoConstructivo(id_etc).then(data => {
    this.estadoTecnicoConstructivoProvider.getAllEstadoTecnicoConstructivo();

  });

}
}
