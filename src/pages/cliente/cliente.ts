import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  // client ={
  //   name: this.clientProvider.client.name,
  //   address: this.clientProvider.client.address,
  //   address2: this.clientProvider.client.address2,
  //   postal_code: this.clientProvider.client.postal_code,
  //   country: this.clientProvider.client.country,
  //   state: this.clientProvider.client.state,
  //   passport: this.clientProvider.client.passport,
  //   identification: this.clientProvider.client.identification,
  //   phone: this.clientProvider.client.phone,
  //   email: this.clientProvider.client.email,
  //   id_client: this.clientProvider.client.id_client
  // };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              // private clientProvider : ClientProvider
            ) {

    // this.clientProvider.client = this.client;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientePage');
  }



}
