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
  allEstadoTecnicoConstructivoParaUnEdificio =[];

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

  constructor(
    public http: HttpClient,
    private databaseProvider: DatabaseProvider

  ) 
  {
    // this.estadoTecnicoConstructivoInitStatic();
    this.getAllEstadoTecnicoConstructivo();
    
  }
  estadoTecnicoConstructivoInitStatic(){
    this.allEstadoTecnicoConstructivo = [
      {
        id_etc: 1,
        fk_parcela: 1,
        elem_construct: 1,
        caract_mater: "Balcones de viga y losa. Elementos decorativos de hormigón armado. ",
        modif: "Transformación de balcones: colocación de celosías de barro. ",
        lesiones: "Pérdida del color, degradación del soporte, fisuras y grietas, degradación del material, manchas de humedad. Rotura importantes de piezas. Pérdida importante de piezas componentes.",
        localizacion: "Uniones, remates y salientes, zonas de humedad",
        buen_estado: 0.0,
        leve: 0.0,
        grave: 0.0,
        muy_grave: 0.0,

      }, 
      {
        id_etc: 2,
        fk_parcela: 1,
        elem_construct: 2,
        caract_mater: "",
        modif: "",
        lesiones: "",
        localizacion: "",
        buen_estado: 0.0,
        leve: 0.0,
        grave: 0.0,
        muy_grave: 0.0,

      }, 
      {
        id_etc: 3,
        fk_parcela: 1,
        elem_construct: 3,
        caract_mater: "",
        modif: "",
        lesiones: "",
        localizacion: "",
        buen_estado: 0.0,
        leve: 0.0,
        grave: 0.0,
        muy_grave: 0.0,

      }
      
    ];
  }
  getAllEstadoTecnicoConstructivo(){
    this.databaseProvider.getAllEstadoTecnicoConstructivo().then(data => {
      this.allEstadoTecnicoConstructivo = data;

    });
  }

  getEstadoTecnicoConstructivoByFK(fk){
    let result;
    this.databaseProvider.getEstadoTecnicoConstructivoByFK(fk).then(data => {
      this.allEstadoTecnicoConstructivoParaUnEdificio = data;
      result = data;
    });
    return result;
  }

  getEstadoTecnicoConstructivoByFKStatic(fk){
    let result = [];
    for(let etc of this.allEstadoTecnicoConstructivo){
      if(etc.fk_parcela == fk){
        result.push(etc);
      }
    }
    this.allEstadoTecnicoConstructivoParaUnEdificio = result;

    return result;

}

}