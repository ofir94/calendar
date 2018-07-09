//<reference path="../../../node_modules/rxjs/Subject.d.ts"/>
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {SQLiteObject, SQLite} from "@ionic-native/sqlite";
import {BehaviorSubject} from "rxjs/BehaviorSubject"; //En el video usan import {BehaviorSubject} from "rxjs/Rx";
import {Storage} from "@ionic/storage"; // en el video usan  import {IonicStorage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject; //Para la conexion de la bd
  private databaseReady: BehaviorSubject<boolean>;

  loadPage = "HomePage";

  
  fixed_day_before_possible_changes;
  constructor(public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform)//Aqui en el video ponen Http pq es otro import
  {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'geomater.db',
        location: 'default'
           
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            }
            else {
              this.fillDatabase();
              
            }
          })
        })
        .catch(e => {
          alert("constructor de database provider")
          alert(e.message)
        });
    });
  }

  fillDatabase() {
    this.http.get('assets/geomater.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => {
            alert("fillDatabase()")
            alert(e.message)
          });
      })
  }
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
  /**
   * @public
   * @method importSQL
   * @param sql    {String}          The SQL data to be imported
   * @description          Imports the supplied SQL data to the application database
   * @return {Promise}
   */
  importSQL(sql: any) {

    return new Promise((resolve, reject) => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  /**
   * @public
   * @method exportAsSQL
   * @description          Exports SQL data from the application database
   * @return {Promise}
   */
  exportAsSQL() {
    return new Promise((resolve, reject) => {
      this.sqlitePorter
        .exportDbToSql(this.database)
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }


  

  getAllInformacionGeneral() {
    return this.database.executeSql("SELECT * FROM informacion_general", []).then(data => {
      let informacion_general = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          informacion_general.push({
            fk_parcela: data.rows.item(i).selected_option,
            nombre: data.rows.item(i).nombre,
            uso_general: data.rows.item(i).uso_general,
            ordenamiento_urbano: data.rows.item(i).ordenamiento_urbano,
            direccion: data.rows.item(i).direccion,
            num_pisos: data.rows.item(i).num_pisos,
            uso_actual: data.rows.item(i).uso_actual,           
            id_info_general: data.rows.item(i).id_info_general,
          });
        }
      }
      alert('informacion_general');
      alert(informacion_general);
     
      return informacion_general;
    }, err => {
      alert(err);
      return [];
    });
  }


  getInformacionGeneralByFK(fk) {
    let sql = "SELECT * FROM room informacion_general fk_parcela =" + fk;
    return this.database.executeSql(sql, []).then(data => {
      let informacion_general;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          informacion_general.push({
            fk_parcela: data.rows.item(i).selected_option,
            nombre: data.rows.item(i).nombre,
            uso_general: data.rows.item(i).uso_general,
            ordenamiento_urbano: data.rows.item(i).ordenamiento_urbano,
            direccion: data.rows.item(i).direccion,
            num_pisos: data.rows.item(i).num_pisos,
            uso_actual: data.rows.item(i).uso_actual,           
            id_info_general: data.rows.item(i).id_info_general,
          });
        }
      }
      return informacion_general;
    }, err => {
      console.log(err);
      return [];
    });
  }

  getAllEvaluacionCultural() {

    return this.database.executeSql("SELECT * FROM evaluacion_cultural", []).then(data => {
      let evaluacion_cultural = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          evaluacion_cultural.push({
            id_evaluacion_cultural: data.rows.item(i).id_evaluacion_cultural,
            fk_parcela: data.rows.item(i).fk_parcela,
            categoria: data.rows.item(i).categoria,
            criterio: data.rows.item(i).criterio,
            info_recogida: data.rows.item(i).info_recogida,
          });
        }
      }
      return evaluacion_cultural;
    }, err => {
      console.log(err);
      return [];
    });
  }

  getEstadoTecnicoConstructivoByFK(fk){
    let sql = "SELECT * FROM room estado_tecnico_constructivo fk_parcela =" + fk;
    return this.database.executeSql(sql, []).then(data => {
      let estado_tecnico_constructivo;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          estado_tecnico_constructivo.push({
            id_etc: data.rows.item(i).id_etc,
            fk_parcela: data.rows.item(i).fk_parcela,
            elem_construct: data.rows.item(i).elem_construct,
            caract_mater: data.rows.item(i).caract_mater,
            modif: data.rows.item(i).modif,
            lesiones: data.rows.item(i).lesiones,
            localizacion: data.rows.item(i).localizacion,
            buen_estado: data.rows.item(i).buen_estado,
            leve: data.rows.item(i).leve,
            cant_bed_double: data.rows.item(i).cant_bed_double,
            grave: data.rows.item(i).grave,
            muy_grave: data.rows.item(i).muy_grave,

          });
        }
      }
      return estado_tecnico_constructivo;
    }, err => {
      console.log(err);
      return [];
    });
  }
  getAllEstadoTecnicoConstructivo() {
    
    return this.database.executeSql("SELECT * FROM estado_tecnico_constructivo", []).then(data => {
      let estado_tecnico_constructivo = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          estado_tecnico_constructivo.push({
            id_etc: data.rows.item(i).id_etc,
            fk_parcela: data.rows.item(i).fk_parcela,
            elem_construct: data.rows.item(i).elem_construct,
            caract_mater: data.rows.item(i).caract_mater,
            modif: data.rows.item(i).modif,
            lesiones: data.rows.item(i).lesiones,
            localizacion: data.rows.item(i).localizacion,
            buen_estado: data.rows.item(i).buen_estado,
            leve: data.rows.item(i).leve,
            cant_bed_double: data.rows.item(i).cant_bed_double,
            grave: data.rows.item(i).grave,
            muy_grave: data.rows.item(i).muy_grave,
            
          });
        }
      }
      return estado_tecnico_constructivo;
    }, err => {
      console.log(err);
      return [];
    });
  }

  getEvaluacionCulturalByFK(fk){

    let sql = "SELECT * FROM room evaluacion_cultural fk_parcela =" + fk;
    return this.database.executeSql(sql, []).then(data => {
      let evaluacion_cultural;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            evaluacion_cultural.push({
            id_evaluacion_cultural: data.rows.item(i).id_evaluacion_cultural,
            fk_parcela: data.rows.item(i).fk_parcela,
            categoria: data.rows.item(i).categoria,
            criterio: data.rows.item(i).criterio,
            info_recogida: data.rows.item(i).info_recogida,
            evaluacion: data.rows.item(i).evaluacion,

          });
        }
      }
      return evaluacion_cultural;
    }, err => {
      console.log(err);
      return [];
    });
  }


 getElementosConstructivos(){
  return this.database.executeSql("SELECT * FROM elemento_constructivo", []).then(data => {
    let elemento_constructivo = [];

    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {

        elemento_constructivo.push({
          id_ec: data.rows.item(i).id_ec,
          elemen_construct: data.rows.item(i).elemen_construct,
        
        });
      }
    }
    return elemento_constructivo;
  }, err => {
    console.log(err);
    return [];
  });
  
 }

 addInformacionGeneral(fk_parcela,nombre, uso_general, direccion, num_pisos){
  let data = [fk_parcela,nombre, uso_general, direccion, num_pisos];
  return this.database.executeSql("INSERT INTO informacion_general (fk_parcela =?, nombre = ?, uso_general = ?, direccion = ?, num_pisos = ?) VALUES (?,?,?,?,?)", data).then(res => {
    return res;
  });
 }
 updateInformacionGeneral( nombre, uso_general, direccion, num_pisos) {
  let data = [nombre, uso_general, direccion, num_pisos];
  return this.database.executeSql("UPDATE informacion_general SET nombre = ?, uso_general = ?, direccion = ?, num_pisos = ?", data).then(res => {
    return res;
  });

}

addEvaluacionCultural(fk_parcela,categoria, criterio, info_recogida, evaluacion){
  let data = [fk_parcela,categoria, criterio, info_recogida, evaluacion];
  return this.database.executeSql("INSERT INTO evaluacion_cultural (fk_parcela =?, categoria = ?, criterio = ?, info_recogida = ?, evaluacion = ?) VALUES (?,?,?,?,?)", data).then(res => {
    return res;
  });
}

updateEvaluacionCultural(categoria, criterio, info_recogida, evaluacion){

   let data = [categoria, criterio, info_recogida, evaluacion];
  return this.database.executeSql("UPDATE evaluacion_cultural SET categoria = ?, criterio = ?, info_recogida = ?, evaluacion = ?", data).then(res => {
    return res;
    
  });
  
}

addEstadoTecnicoConstructivo(fk_parcela,elem_construct, caract_mater, modif, lesiones,localizacion, buen_estado, leve, grave,muy_grave){
  let data = [fk_parcela,elem_construct, caract_mater, modif, lesiones,localizacion, buen_estado, leve, grave,muy_grave];
  return this.database.executeSql("INSERT INTO estado_tecnico_constructivo (fk_parcela =?, estado_tecnico_constructivo SET elem_construct = ?, caract_mater = ?, modif = ?, lesiones = ?, localizacion = ?, buen_estado = ?, leve = ?, grave = ?, muy_grave = ?) VALUES (?,?,?,?,?,?,?,?,?,?)", data).then(res => {
    return res;
  });
}

updateEstadoTecnicoConstructivo(elem_construct, caract_mater, modif, lesiones,localizacion, buen_estado, leve, grave,muy_grave){
  let data = [elem_construct, caract_mater, modif, lesiones,localizacion, buen_estado, leve, grave,muy_grave];
  return this.database.executeSql("UPDATE estado_tecnico_constructivo SET elem_construct = ?, caract_mater = ?, modif = ?, lesiones = ?, localizacion = ?, buen_estado = ?, leve = ?, grave = ?, muy_grave = ?", data).then(res => {
    return res;
    
  });
}

deleteEstadoTecnicoConstructivo(id_etc){
  let sql = "DELETE FROM estado_tecnico_constructivo WHERE id_reservation = ?";
  let data = [id_etc]
  return this.database.executeSql(sql,data).then(res => {
    return res;
  });
}
}


