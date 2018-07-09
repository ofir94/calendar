import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { EvaluacionCulturalProvider } from '../../providers/evaluacionCultural/evaluacionCultural';

/**
 * Generated class for the EvaluacionCulturalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evaluacion-cultural',
  templateUrl: 'evaluacion-cultural.html',
})
export class EvaluacionCulturalPage {
  allCategoria =[];
  allCriterio = [];
  allEvaluacion = [];
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
               public viewCtrl : ViewController,
               public databaseProvider : DatabaseProvider,
               private evaluacionCulturalProvider :EvaluacionCulturalProvider,



  ) 
  {
    this.evaluacionCultural = evaluacionCulturalProvider.evaluacionCultural;
    this.inicializarCategoriaStatic();
    this.inicializarCriterioStatic();
    this.inicializarEvaluacionStatic();
  }
  public closeModal(){
    this.viewCtrl.dismiss().then(e=>{
      // this.databaseProvider.loadPage = "HomePage";

    });
  }

  inicializarCategoriaStatic(){
    this.allCategoria = [
      {
        id_eval_cult_categoria: 1,
        categoria: "Valor histórico"
      },
      {
        id_eval_cult_categoria: 2,
        categoria: "Valor urbanístico"
      },
      {
        id_eval_cult_categoria: 3,
        categoria: "Valor social"
      },
      {
        id_eval_cult_categoria: 4,
        categoria: "Afectación de la integridad"
      },
      {
        id_eval_cult_categoria: 5,
        categoria: "Nivel de protección"
      },
     
    ]
  }

  inicializarCriterioStatic(){
    this.allCriterio = [
      {
        id_eval_cult_criterio: 1,
        criterio: "Influencia en el crecimiento y desarrollo de la ciudad"
      },
      {
        id_eval_cult_criterio: 2,
        criterio: "Hecho histórico"
      },
      {
        id_eval_cult_criterio: 3,
        criterio: "Personalidades"
      },
      {
        id_eval_cult_criterio: 4,
        criterio: "Período aproximado de contrucción"
      },
      {
        id_eval_cult_criterio: 5,
        criterio: "Potencial arqueológico"
      },
     
    ]
  }

  inicializarEvaluacionStatic(){
    this.allEvaluacion = [
      {
        id_eval_cult_evaluacion: 1,
        evaluacion: "Excelente"
      },
      {
        id_eval_cult_evaluacion: 2,
        evaluacion: "Bien"
      },
      {
        id_eval_cult_evaluacion: 3,
        evaluacion: "Regular"
      },
      {
        id_eval_cult_evaluacion: 4,
        evaluacion: "Pobre"
      }
    ]
  }
  updateEvaluacionCultural(){
    this.evaluacionCulturalProvider.evaluacionCultural = this.evaluacionCultural;

    this.databaseProvider.updateEvaluacionCultural(

      this.evaluacionCulturalProvider.evaluacionCultural['categoria'],
      this.evaluacionCulturalProvider.evaluacionCultural['criterio'],
      this.evaluacionCulturalProvider.evaluacionCultural['info_recogida'],
      this.evaluacionCulturalProvider.evaluacionCultural['evaluacion'],

    );

  }
  addEvaluacionCultural(){
    this.evaluacionCulturalProvider.evaluacionCultural = this.evaluacionCultural;

    this.databaseProvider.addEvaluacionCultural(

      this.evaluacionCulturalProvider.evaluacionCultural['fk_parcela'],
      this.evaluacionCulturalProvider.evaluacionCultural['categoria'],
      this.evaluacionCulturalProvider.evaluacionCultural['criterio'],
      this.evaluacionCulturalProvider.evaluacionCultural['info_recogida'],
      this.evaluacionCulturalProvider.evaluacionCultural['evaluacion'],

    );
  



  }

  save(){
    try 
    {

    if (this.evaluacionCulturalProvider.evaluacionCultural.id_evaluacion_cultural != 0) {
      this.updateEvaluacionCultural();
    }
    if(this.evaluacionCulturalProvider.evaluacionCultural.id_evaluacion_cultural == 0){
      this.addEvaluacionCultural();
    }

    this.evaluacionCulturalProvider.allEvaluacionCulturalParaUnEdificio.push(this.evaluacionCultural);

  }
    catch(err)
    {
      alert('error salvando EN TAB')
      console.log(err.message)
    }

    
    this.closeModal();
  }
  

}
