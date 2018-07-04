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

  allEvaluacoinCultural = [];

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

  }

  getAllEvaluacionCultural(){
    this.databaseProvider.getAllEvaluacionCultural().then(data => {
      this.allEvaluacoinCultural = data;

    });
  }

  getEvaluacionCulturalByFK(fk){
    let result;
    this.databaseProvider.getEvaluacionCulturalByFK(fk).then(data => {
      this.evaluacionCultural = data;
      result = data;
    });
    return result;
  }

}
