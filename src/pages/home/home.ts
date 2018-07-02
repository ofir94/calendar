import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SearchPage } from '../search/search';
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

   crear_evento(){
    alert(id_parcela);

  }

  searchReservation() {
        let modal = this.modalCtrl.create(SearchPage);
        modal.present();
      }
}
