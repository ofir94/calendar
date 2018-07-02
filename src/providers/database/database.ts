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
        location: 'default'   //aqui podemos decirle q se cree la bd en um lugar específico
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
            console.log("database")
            console.log(e.message)
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


  addReservation(from_date, to_date, cant_adult, cant_kid, price, deposit, comment, cant_bed_single, cant_bed_double, id_room, status,tarea, id_client) {
    let data = [from_date, to_date, cant_adult, cant_kid, price, deposit, comment, cant_bed_single, cant_bed_double, id_room, status,tarea,  id_client];
    return this.database.executeSql("INSERT INTO reservation (from_date, to_date, cant_adult, cant_kid, price, deposit, comment, cant_bed_single , cant_bed_double , id_room, status, tarea, id_client) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", data).then(res => {
      return res;
    });
  }


  addClient(name, address, address2, state, postal_code, country, passport, identification, phone, email, id_client) {

    let data = [name, address, address2, state, postal_code, country, passport, identification, phone, email,id_client];
    return this.database.executeSql("INSERT INTO client (name, address, address2, state, postal_code, country, passport , identification ,phone, email,id_client) VALUES (?,?,?,?,?,?,?,?,?,?,?)", data).then(res => {

      return res;
    });
  }

  addRoom(name, cant_people, cant_bed_aditional, cant_bed_single, cant_bed_double, view_order, price) {
    let data = [name, cant_people, cant_bed_aditional, cant_bed_single, cant_bed_double, view_order, price];
    return this.database.executeSql("INSERT INTO room (name, cant_people, cant_bed_aditional, cant_bed_single, cant_bed_double,view_order, price ) VALUES (?,?,?,?,?,?,?)", data).then(res => {
      return res;
    });
  }

  updateRoom(name, cant_people, cant_bed_aditional, cant_bed_single, cant_bed_double, view_order, price, id_room) {
    let data = [name, cant_people, cant_bed_aditional, cant_bed_single, cant_bed_double, view_order, price, id_room];
    return this.database.executeSql("UPDATE room SET name = ?, cant_people = ?, cant_bed_aditional = ?, cant_bed_single = ?, cant_bed_double = ?, view_order = ?, price = ? WHERE id_room = ?", data).then(res => {
      return res;
    });

  }

  updateCleaning(selected_option, fixed_day, after_exit, week_day, id_cleaning_object) {
    let data = [selected_option, fixed_day, after_exit, week_day, id_cleaning_object];
    return this.database.executeSql("UPDATE frequency SET selected_option = ?, fixed_day = ?, after_exit = ?, week_day = ? WHERE id_cleaning_object = ?", data).then(res => {
      return res;
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
      return informacion_general;
    }, err => {
      console.log(err);
      return [];
    });
  }


  getInformacionGeneral(id) {
    let sql = "SELECT * FROM room informacion_general fk_parcela =" + id;
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

  getAllClients() {


    return this.database.executeSql("SELECT * FROM client", []).then(data => {
      let clients = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          clients.push({
            id_client: data.rows.item(i).id_client,
            name: data.rows.item(i).name,
            address: data.rows.item(i).address,
            address2: data.rows.item(i).address2,
            state: data.rows.item(i).state,
            postal_code: data.rows.item(i).postal_code,
            country: data.rows.item(i).country,
            passport: data.rows.item(i).passport,
            identification: data.rows.item(i).identification,
            phone: data.rows.item(i).phone,
            email: data.rows.item(i).email,
          });
        }
      }
      return clients;
    }, err => {
      console.log(err);
      return [];
    });
  }

  



  getAllReservation() {

    return this.database.executeSql("SELECT * FROM reservation", []).then(data => {
      let reservation = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          reservation.push({
            id_reservation: data.rows.item(i).id_reservation,
            from_date: data.rows.item(i).from_date,
            to_date: data.rows.item(i).to_date,
            cant_adult: data.rows.item(i).cant_adult,
            cant_kid: data.rows.item(i).cant_kid,
            price: data.rows.item(i).price,
            deposit: data.rows.item(i).deposit,
            comment: data.rows.item(i).comment,
            cant_bed_single: data.rows.item(i).cant_bed_single,
            cant_bed_double: data.rows.item(i).cant_bed_double,
            id_room: data.rows.item(i).id_room,
            status: data.rows.item(i).status,
            id_client: data.rows.item(i).id_client,
            limpieza:data.rows.item(i).limpieza,
            tarea:data.rows.item(i).tarea
          });
        }
      }
      return reservation;
    }, err => {
      console.log(err);
      return [];
    });
  }

  

  getAllStatus() {
    return this.database.executeSql("SELECT * FROM reservation_status", []).then(data => {
      let reservation_status = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          reservation_status.push({
            id_status: data.rows.item(i).id_status,
            status: data.rows.item(i).status,

          });
        }
      }
      return reservation_status;
    }, err => {
      console.log(err);
      return [];
    });
  }

  getAllRooms() {
    return this.database.executeSql("SELECT * FROM room ORDER BY view_order", []).then(data => {
      let rooms = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          rooms.push({
            id_room: data.rows.item(i).id_room,
            name: data.rows.item(i).name,
            cant_people: data.rows.item(i).cant_people,
            cant_bed_aditional: data.rows.item(i).cant_bed_aditional,
            cant_bed_single: data.rows.item(i).cant_bed_single,
            cant_bed_double: data.rows.item(i).cant_bed_double,
            view_order: data.rows.item(i).view_order,
            price: data.rows.item(i).price
          });
        }
      }
      return rooms;
    }, err => {
      console.log(err);
      return [];
    });
  }

  getRoomById(id) {
    let sql = "SELECT * FROM room WHERE id_room =" + id;
    return this.database.executeSql(sql, []).then(data => {
      let room;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          room.push({
            id_room: data.rows.item(i).id_room,
            name: data.rows.item(i).name,
            cant_people: data.rows.item(i).cant_people,
            cant_bed_aditional: data.rows.item(i).cant_bed_aditional,
            cant_bed_single: data.rows.item(i).cant_bed_single,
            cant_bed_double: data.rows.item(i).cant_bed_double,
            view_order: data.rows.item(i).view_order
          });
        }
      }
      return room;
    }, err => {
      console.log(err);
      return [];
    });
  }


  async getClientById(id) {

    let sql = "SELECT * FROM client WHERE id_client = '" + id + "'";

    return await this.database.executeSql(sql, []).then(data => {
      let client;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          client.push({
            id_client: data.rows.item(i).id_client,
            name: data.rows.item(i).name,
            address: data.rows.item(i).address,
            address2: data.rows.item(i).address2,
            state: data.rows.item(i).state,
            postal_code: data.rows.item(i).postal_code,
            country: data.rows.item(i).country,
            passport: data.rows.item(i).passport,
            identification: data.rows.item(i).identification,
            phone: data.rows.item(i).phone,
            email: data.rows.item(i).email
          });
        }
      }
      return client;
    }, err => {
      console.log(err);
      return [];
    });
  }


  async getClientByIdAsync(id){

    let sql = "SELECT * FROM client WHERE id_client = '" + id + "'";

   let client = [];
    let data = await this.database.executeSql(sql, []);

           if (data.rows.length > 0) {
             for (var i = 0; i < data.rows.length; i++) {
               client.push({
                 id_client: data.rows.item(i).id_client,
                 name: data.rows.item(i).name,
                 address: data.rows.item(i).address,
                 address2: data.rows.item(i).address2,
                 state: data.rows.item(i).state,
                 postal_code: data.rows.item(i).postal_code,
                 country: data.rows.item(i).country,
                 passport: data.rows.item(i).passport,
                 identification: data.rows.item(i).identification,
                 phone: data.rows.item(i).phone,
                 email: data.rows.item(i).email
               });
             }

           }


   return client;
  }


  getLastClient() {
    let sql = "SELECT * FROM client";

    return this.database.executeSql(sql, []).then(data => {
      let client;
      let id;
      if (data.rows.length > 0) {

        let maxId = data.rows.item(0).id_client;
         id =  data.rows.item(0).id_client;
        for (var i = 0; i < 1; i++) {

          if(maxId<data.rows.item(i).id_client)
             id = i;

          client.push({
            id_client: data.rows.item(i).id_client,
            name: data.rows.item(i).name,
            address: data.rows.item(i).address,
            address2: data.rows.item(i).address2,
            state: data.rows.item(i).state,
            postal_code: data.rows.item(i).postal_code,
            country: data.rows.item(i).country,
            passport: data.rows.item(i).passport,
            identification: data.rows.item(i).identification,
            phone: data.rows.item(i).phone,
            email: data.rows.item(i).email
          });
        }
      //  alert('id cliente DB: '+client.id_client);
      }
      return client[id];
    }, err => {
      console.log(err);
      return [];
    });
  }

  updateReservationTarea(id_reservation,tarea,limpiezaBd) {
    let data = [tarea,limpiezaBd, id_reservation];
    return this.database.executeSql("UPDATE reservation SET tarea = ?, limpieza = ?  WHERE id_reservation = ? ", data).then(res => {
      return res;
    });

  }
  updateReservationTareaLimpieza(id_reservation,limpiezaBd) {
    let data = [limpiezaBd, id_reservation];
    return this.database.executeSql("UPDATE reservation SET  limpieza = ?  WHERE id_reservation = ? ", data).then(res => {
      return res;
    });

  }

  updateReservationStatus(id_reservation,status) {
    let data = [status, id_reservation];

    return this.database.executeSql("UPDATE reservation SET status = ? WHERE id_reservation = ?", data).then(res => {
      return res;
    });

  }

  deleteReservation(id_reservation){

    let sql = "DELETE FROM reservation WHERE id_reservation = ?";
    let data = [id_reservation]
    return this.database.executeSql(sql,data).then(res => {
      return res;
    });

  }

  deleteRoom(id_room){

    let data = [id_room];
    let sql = "DELETE FROM room WHERE id_room = ?";
    return this.database.executeSql(sql,data).then(res => {
      return res;
    });

  }

  deleteReservationsByRoom(id_room){
    let sql = "DELETE FROM reservation WHERE id_room = ?";
    return this.database.executeSql(sql,id_room).then(res => {
      return res;
    });
  }

  updateReservation(from_date, to_date, cant_adult, cant_kid, price, deposit, comment, cant_bed_single, cant_bed_double, id_room, status, id_client, id_reservation) {
    let data = [from_date, to_date, cant_adult, cant_kid, price, deposit, comment, cant_bed_single, cant_bed_double, id_room, status, id_client, id_reservation];
    return this.database.executeSql("UPDATE reservation SET from_date = ?, to_date = ?, cant_adult = ?, cant_kid = ?, price = ?, deposit = ?, comment = ?, cant_bed_single = ?, cant_bed_double = ?, id_room = ?, status = ?, id_client = ? WHERE id_reservation = ?", data).then(res => {
      return res;
    });

  }
  updateClient(name, address, address2, state, postal_code, country, passport, identification, phone, email, id_client) {
    let data = [name, address, address2, state, postal_code, country, passport, identification, phone, email, id_client];
    return this.database.executeSql("UPDATE client SET name = ?, address = ?, address2 = ?, state = ?, postal_code = ?, country = ?, passport = ?, identification = ?, phone = ?, email = ? WHERE id_client = ?", data).then(res => {
      return res;
    });

  }

  async getRoomByIdAsync(id) {
    let sql = "SELECT * FROM room WHERE id_room =" + id;
    return await this.database.executeSql(sql, []).then(data => {
      let room;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          room={
            id_room: data.rows.item(i).id_room,
            name: data.rows.item(i).name,
            cant_people: data.rows.item(i).cant_people,
            cant_bed_aditional: data.rows.item(i).cant_bed_aditional,
            cant_bed_single: data.rows.item(i).cant_bed_single,
            cant_bed_double: data.rows.item(i).cant_bed_double,
            view_order: data.rows.item(i).view_order
          };
        }
      }
      return room;
    }, err => {
      console.log(err);
      return [];
    });
  }



 

  async updateInicioProfile(inicio) {
    let data = [inicio, 1];

    return await this.database.executeSql("UPDATE profile SET inicio = ? WHERE id_profile = ?", data).then(res => {

      return res;
    }, rej=>{
      console.log(rej.message)
    });

  }

   updateInicioFixedDay(fixed_day) {
    let data = [fixed_day, 1];

    return  this.database.executeSql("UPDATE profile SET fixed_day = ? WHERE id_profile = ?", data).then(res => {

      return res;
    }, rej=>{
      console.log(rej.message)
    });

  }

    updateWeekDayInfo(week_day_info) {
    let data = [week_day_info, 1];

    return  this.database.executeSql("UPDATE profile SET week_day_info = ? WHERE id_profile = ?", data).then(res => {

      return res;
    }, rej=>{
      console.log(rej.message)
    });

  }



}


