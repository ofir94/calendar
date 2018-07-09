import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import { InformacionGeneralProvider } from '../../providers/informacionGeneral/informacionGeneral';
import {TabPage} from "../tab/tab";
import { EvaluacionCulturalProvider } from '../../providers/evaluacionCultural/evaluacionCultural';
import { EstadoTecnicoConstructivoProvider } from '../../providers/estadoTecnicoConstructivo/estadoTecnicoConstructivo';

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
              public ionformacionGeneralProvider : InformacionGeneralProvider,
              public evaluacionCulturalProvider : EvaluacionCulturalProvider,
              public estadoTecnicoConstructivoProvider : EstadoTecnicoConstructivoProvider,
              


  ) {


    this.allInnformacionGeneral = this.ionformacionGeneralProvider.allInformacionGeneral;
    // this.databaseProvider.loadPage = "SearchPage";

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
    this.filterInformacionGeneral = this.ionformacionGeneralProvider.allInformacionGeneral;
    alert("initializeItems()");
    alert(this.filterInformacionGeneral[0]);
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
        if( (info.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 ) || (info.direccion.toLowerCase().indexOf(val.toLowerCase()) > -1)){ //No busca bien x direccion
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
    return this.ionformacionGeneralProvider.getInformacionGeneralName(id);
  }

  getInformacionGeneralDireccion(id){
    return this.ionformacionGeneralProvider.getInformacionGeneralDireccion(id);
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

  
 
 
  viewInformacionGeneral(info){ //Aqui poner la info general
  // alert("Info de general");
    this.ionformacionGeneralProvider.ionforamcionGeneral.id_info_general = info.id_info_general;
    this.ionformacionGeneralProvider.ionforamcionGeneral.fk_parcela = info.fk_parcela;
    this.ionformacionGeneralProvider.ionforamcionGeneral.nombre = info.nombre;
    this.ionformacionGeneralProvider.ionforamcionGeneral.uso_general = info.uso_general;
    this.ionformacionGeneralProvider.ionforamcionGeneral.direccion = info.direccion;
    this.ionformacionGeneralProvider.ionforamcionGeneral.num_pisos = info.num_pisos;

    // alert(this.ionformacionGeneralProvider.ionforamcionGeneral.id_info_general);
    // alert(this.ionformacionGeneralProvider.ionforamcionGeneral.fk_parcela);
    // alert(this.ionformacionGeneralProvider.ionforamcionGeneral.nombre);
    // alert( this.ionformacionGeneralProvider.ionforamcionGeneral.uso_general);

    // let allEvaluacionCultural = this.evaluacionCulturalProvider.getEvaluacionCulturalByFKStatic(this.ionformacionGeneralProvider.ionforamcionGeneral.fk_parcela);
    let allEvaluacionCultural = this.evaluacionCulturalProvider.getEvaluacionCulturalByFK(this.ionformacionGeneralProvider.ionforamcionGeneral.fk_parcela);

    // if(evaluacionCultural != null){
    // //esto esta de mas pq getEvaluacionCulturalByFK(fk) ya le da valor a evaluacionCultural
    // this.evaluacionCulturalProvider.evaluacionCultural.id_evaluacion_cultural = evaluacionCultural.id_evaluacion_cultural;
    // this.evaluacionCulturalProvider.evaluacionCultural.fk_parcela = evaluacionCultural.fk_parcela;
    // this.evaluacionCulturalProvider.evaluacionCultural.categoria = evaluacionCultural.categoria;
    // this.evaluacionCulturalProvider.evaluacionCultural.criterio = evaluacionCultural.criterio;
    // this.evaluacionCulturalProvider.evaluacionCultural.info_recogida = evaluacionCultural.info_recogida;
    // this.evaluacionCulturalProvider.evaluacionCultural.evaluacion = evaluacionCultural.evaluacion;
    // }
    // alert(this.evaluacionCulturalProvider.evaluacionCultural.id_evaluacion_cultural);
    // alert(this.evaluacionCulturalProvider.evaluacionCultural.fk_parcela);
    // alert(this.evaluacionCulturalProvider.evaluacionCultural.categoria);
    // alert(this.evaluacionCulturalProvider.evaluacionCultural.criterio);
   
    // let allEstadoTecnicoConstructivo = this.estadoTecnicoConstructivoProvider.getEstadoTecnicoConstructivoByFKStatic(this.ionformacionGeneralProvider.ionforamcionGeneral.fk_parcela);
    let allEstadoTecnicoConstructivo = this.estadoTecnicoConstructivoProvider.getEstadoTecnicoConstructivoByFK(this.ionformacionGeneralProvider.ionforamcionGeneral.fk_parcela);

    // if( allEstadoTecnicoConstructivo.length > 0){
    //   for(let estadoTecnicoConstructivo of allEstadoTecnicoConstructivo){ 
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.id_etc = estadoTecnicoConstructivo.id_etc;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.fk_parcela = estadoTecnicoConstructivo.fk_parcela;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.elem_construct = estadoTecnicoConstructivo.elem_construct;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.caract_mater = estadoTecnicoConstructivo.caract_mater;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.modif = estadoTecnicoConstructivo.modif;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.lesiones = estadoTecnicoConstructivo.lesiones;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.localizacion = estadoTecnicoConstructivo.localizacion;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.buen_estado = estadoTecnicoConstructivo.buen_estado;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.leve = estadoTecnicoConstructivo.leve;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.grave = estadoTecnicoConstructivo.grave;
    //     this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.muy_grave = estadoTecnicoConstructivo.muy_grave;
        
    //   }
    // }
    // alert( this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.id_etc);
    // alert( this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.fk_parcela);
    // alert( this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.elem_construct);
    // alert( this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.caract_mater);



    this.navCtrl.push(TabPage);
    this.closeModal();

  }



}
