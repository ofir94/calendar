import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { EvaluacionCulturalProvider } from '../../providers/evaluacionCultural/evaluacionCultural';
import { EvaluacionCulturalPage } from '../evaluacion-cultural/evaluacion-cultural';
import { DatabaseProvider } from '../../providers/database/database';
// import {ClientProvider} from "../../providers/client/client";

/**
 * Generated class for the ClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {
  allevaluacionCultural = [];
  evaluacionCultural ={

    id_evaluacion_cultural: 0,
    fk_parcela: 0,
    categoria: 0,
    criterio: 0,
    info_recogida: "",
    evaluacion: 0

  }



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private evaluacionCulturalProvider :EvaluacionCulturalProvider,
              public modalCtrl: ModalController,
              public alertCtrl : AlertController,
              private databaseProvider: DatabaseProvider,



            ) 
            
  {

    this.allevaluacionCultural = this.evaluacionCulturalProvider.allEvaluacionCulturalParaUnEdificio;
    this.evaluacionCulturalProvider.evaluacionCultural = this.evaluacionCultural;
  }

  viewEvaluacionCultural(evaluacionCultural){
    alert(evaluacionCultural.id_evaluacion_cultural);
  let modal = this.modalCtrl.create(EvaluacionCulturalPage);

  this.evaluacionCulturalProvider.evaluacionCultural = evaluacionCultural;

  modal.present();
  }

  crearEC(){
    let modal = this.modalCtrl.create(EvaluacionCulturalPage);
    modal.present();
  
  }

  eliminarEC(ec,i){

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
            this.evaluacionCulturalProvider.allEvaluacionCulturalParaUnEdificio.splice(i,1); 
  
  
            // this.deleteEstadoTecnicoConstructivo(etc.id_etc);
        
  
          }
        }
      ]
    });
    alerta.present();
  }
  
  deleteEstadoEvaluacionCultural(id_etc){
    this.databaseProvider.deleteEstadoTecnicoConstructivo(id_etc).then(data => {
      this.evaluacionCulturalProvider.getAllEvaluacionCultural();
  
    });
  
  }

}
