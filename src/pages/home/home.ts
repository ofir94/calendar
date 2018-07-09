import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { InformacionGeneralProvider } from '../../providers/informacionGeneral/informacionGeneral';
import { TabPage } from '../tab/tab';
import { EvaluacionCulturalProvider } from '../../providers/evaluacionCultural/evaluacionCultural';
import { EstadoTecnicoConstructivoProvider } from '../../providers/estadoTecnicoConstructivo/estadoTecnicoConstructivo';
// import testvar from '../../assets/utils/js/test.js';
declare var  id_parcela;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController
    , public events: Events,
    public modalCtrl: ModalController,
    private informacionGeneralProvider: InformacionGeneralProvider,
    private evaluacionCulturalProvider: EvaluacionCulturalProvider,
    private estadoTecnicoConstructivoProvider: EstadoTecnicoConstructivoProvider,
    


  ) {
    // alert(coordinates);

    // events.publish("sharedObject", coordinates);
    // events.subscribe('shareObject',(coordinates) =>{
    //     alert(coordinates[0]);
    // });


  }

  
  closePopupInfo(){
    document.getElementById('divInfoPopupId').style.display = 'none';
  }

  verMasInformacion(){


  let info = this.informacionGeneralProvider.getInformacionGeneralByFK(id_parcela);

  this.informacionGeneralProvider.ionforamcionGeneral.id_info_general = info.id_info_general;
  this.informacionGeneralProvider.ionforamcionGeneral.fk_parcela = info.fk_parcela;
  this.informacionGeneralProvider.ionforamcionGeneral.nombre = info.nombre;
  this.informacionGeneralProvider.ionforamcionGeneral.uso_general = info.uso_general;
  this.informacionGeneralProvider.ionforamcionGeneral.direccion = info.direccion;
  this.informacionGeneralProvider.ionforamcionGeneral.num_pisos = info.num_pisos;

  // alert(this.ionformacionGeneralProvider.ionforamcionGeneral.id_info_general);
  // alert(this.ionformacionGeneralProvider.ionforamcionGeneral.fk_parcela);
  // alert(this.ionformacionGeneralProvider.ionforamcionGeneral.nombre);
  // alert( this.ionformacionGeneralProvider.ionforamcionGeneral.uso_general);

  let allEvaluacionCultural = this.evaluacionCulturalProvider.getEvaluacionCulturalByFK(id_parcela);

  
  // alert(this.evaluacionCulturalProvider.evaluacionCultural.id_evaluacion_cultural);
  // alert(this.evaluacionCulturalProvider.evaluacionCultural.fk_parcela);
  // alert(this.evaluacionCulturalProvider.evaluacionCultural.categoria);
  // alert(this.evaluacionCulturalProvider.evaluacionCultural.criterio);
 
  // let allEstadoTecnicoConstructivo = this.estadoTecnicoConstructivoProvider.getEstadoTecnicoConstructivoByFKStatic(id_parcela);
  let allEstadoTecnicoConstructivo = this.estadoTecnicoConstructivoProvider.getEstadoTecnicoConstructivoByFK(id_parcela);

  
  // alert( this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.id_etc);
  // alert( this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.fk_parcela);
  // alert( this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.elem_construct);
  // alert( this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.caract_mater);



  this.navCtrl.push(TabPage);



  }

  searchReservation() {
        let modal = this.modalCtrl.create(SearchPage);
        modal.present();
      }
}
