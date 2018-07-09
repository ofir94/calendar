import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { EstadoTecnicoConstructivoProvider } from '../../providers/estadoTecnicoConstructivo/estadoTecnicoConstructivo';

/**
 * Generated class for the EstadoTecnicoConstructivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estado-tecnico-constructivo',
  templateUrl: 'estado-tecnico-constructivo.html',
})
export class EstadoTecnicoConstructivoPage {
  allElementoConstructivo =[];
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
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public databaseProvider : DatabaseProvider,
              public estadoTecnicoConstructivoProvider : EstadoTecnicoConstructivoProvider,



  ) 
  {
    this.estadoTecnicoConstructivo = estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo;
    this.inicializarElementosConstructivosStatic();
  }

  inicializarElementosConstructivosStatic(){
    this.allElementoConstructivo = [
      {
        id_ec: 1,
        elem_construct: "Cimentación"
      },
      {
        id_ec: 2,
        elem_construct: "Estructura Vertical"
      },
      {
        id_ec: 3,
        elem_construct: "Estructura Horizontal"
      },
      {
        id_ec: 4,
        elem_construct: "Escaleras y rampas"
      },
      {
        id_ec: 5,
        elem_construct: "Cerramientos"
      },
      {
        id_ec: 6,
        elem_construct: "Voladizos y elementos singulares"
      },
    ]
  }
  public closeModal(){
    this.viewCtrl.dismiss().then(e=>{
      // this.databaseProvider.loadPage = "HomePage";

    });
  }
  updateEstadoTecnicoConstructivo(){
    this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo = this.estadoTecnicoConstructivo;
    this.databaseProvider.updateEstadoTecnicoConstructivo(
    
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['elem_construct'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['caract_mater'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['modif'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['lesiones'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['localizacion'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['buen_estado'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['leve'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['grave'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['muy_grave'],
     
    );
  }
  addEstadoTecnicoConstructivo(){
    this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo = this.estadoTecnicoConstructivo;

    this.databaseProvider.addEstadoTecnicoConstructivo(

      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['fk_parcela'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['elem_construct'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['caract_mater'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['modif'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['lesiones'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['localizacion'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['buen_estado'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['leve'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['grave'],
      this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo['muy_grave'],
     
    );
  }
  save(){
    try 
    {

      // if (this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.id_etc != 0){
      //   this.updateEstadoTecnicoConstructivo();
      // }
      // if(this.estadoTecnicoConstructivoProvider.estadoTecnicoConstructivo.id_etc == 0){
      //   this.addEstadoTecnicoConstructivo();
      // }

    this.estadoTecnicoConstructivoProvider.allEstadoTecnicoConstructivoParaUnEdificio.push(this.estadoTecnicoConstructivo); // TODO id en 0

  }
    catch(err)
    {
      alert('error salvando EN TAB')
      console.log(err.message)
    }

    
    this.closeModal();
  }
}
