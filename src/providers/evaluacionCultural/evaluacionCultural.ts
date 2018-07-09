import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the EvaluacionCulturalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvaluacionCulturalProvider {

  allEvaluacionCultural = [];

  allEvaluacionCulturalParaUnEdificio = [];

  evaluacionCultural ={

    id_evaluacion_cultural: 0,
    fk_parcela: 0,
    categoria: 0,
    criterio: 0,
    info_recogida: "",
    evaluacion: 0

  }

  constructor(
    public http: HttpClient,
    private databaseProvider: DatabaseProvider

  ) 
  {
    // this.evaluacionCulturalStatic();
    this.getAllEvaluacionCultural();
  }

  evaluacionCulturalStatic(){

    this.allEvaluacionCultural = [
      {
        id_evaluacion_cultural: 1,
        fk_parcela: 1,
        categoria: 1,
        criterio: 2,
        info_recogida: "Ninguna",
        evaluacion: 4


      },
     {
        id_evaluacion_cultural: 2,
        fk_parcela: 1,
        categoria: 3,
        criterio: 1,
        info_recogida: "Aqui vivió Pedro Luis Lazo",
        evaluacion: 1


      }, {
          id_evaluacion_cultural: 3,
          fk_parcela: 1,
          categoria: 5,
          criterio: 3,
          info_recogida: "Ninguna",
          evaluacion: 2


      }, {
        id_evaluacion_cultural: 4,
        fk_parcela: 1,
        categoria: 4,
        criterio: 4,
        info_recogida: "Se ubica en la Zona Urbana de Valor Histórico Cultural del Municipio Centro Habana.",
        evaluacion: 3


      }, {
        id_evaluacion_cultural: 5,
        fk_parcela: 1,
        categoria: 2,
        criterio: 5,
        info_recogida: "Fue concebida como un edificio de viviendas desde sus inicios",
        evaluacion: 1


      }]
  }

  getAllEvaluacionCultural(){
    this.databaseProvider.getAllEvaluacionCultural().then(data => {
      this.allEvaluacionCultural = data;

    });
  }

  getEvaluacionCulturalByFK(fk){
    let result;
    this.databaseProvider.getEvaluacionCulturalByFK(fk).then(data => {
      this.allEvaluacionCulturalParaUnEdificio = data;
      result = data;
    });
    return result;
  }

  getEvaluacionCulturalByFKStatic(fk){
    let result = [];
    for(let evaluacion of this.allEvaluacionCultural){
      if(evaluacion.fk_parcela == fk){
        result.push(evaluacion);
      }

    }
    this.allEvaluacionCulturalParaUnEdificio = result;

    return result;
  }

}
