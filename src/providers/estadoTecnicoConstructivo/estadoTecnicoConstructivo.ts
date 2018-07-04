import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the EstadoTecnicoConstructivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstadoTecnicoConstructivoProvider {
  allEstadoTecnicoConstructivo = [];

  estadoTecnicoConstructivo = {
      id_etc: 0,
      fk_parcela: 0,
      elem_construct: 0,
      caract_mater: "",
      modif: "",
      lesiones: "",
      localizacion: "",
      buen_estado: "",
      leve: 0.0,
      grave: 0.0,
      muy_grave: 0.0
  }

  constructor(
    public http: HttpClient,
    private databaseProvider: DatabaseProvider

  ) 
  {

  }

  getAllEstadoTecnicoConstructivo(){
    this.databaseProvider.getAllEstadoTecnicoConstructivo().then(data => {
      this.allEstadoTecnicoConstructivo = data;

    });
  }

  getEstadoTecnicoConstructivoByFK(fk){
    let result;
    this.databaseProvider.getEvaluacionCulturalByFK(fk).then(data => {
      this.estadoTecnicoConstructivo = data;
      result = data;
    });
    return result;
  }
}
