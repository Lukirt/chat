import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

// import { Contacts, Contact, ContactFieldType, ContactName } from '@ionic-native/contacts';

import { Geolocation } from '@ionic-native/geolocation';

// import { CartePage } from '../carte/carte';

// import { Observable } from 'rxjs';

/**
* Generated class for the ChatPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  ownNumber;
  message: string = '';
  s: any;
  messages: object[] = [];
  password: any;
  latitude: number;
  longitude: number;
  myDate: Date;
  // distance: double;
  contactsFound = [];
  tampon = [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    public navParams: NavParams, public geolocation: Geolocation) {
      // let key = this.db.list('/user/').push().key;
      // console.log(key);
      // this.db.database.ref('/user/').orderByChild('username').equalTo('to').once('value').then(snapshot => {
      //   console.log(snapshot.val());
      //   snapshot.forEach(user => {
      //     this.tampon.push(snapshot.val());
      //   });
      // });
      //this.db.list('/user/-LDCP5dBuTPpuMsY2zkp').remove();

      //

      this.ownNumber = this.navParams.get('ownNumber');
      this.username = this.navParams.get('username');
      this.s = this.db.list('/chat/').valueChanges().subscribe( data => {
        this.messages = data;
      });


      this.geolocation.getCurrentPosition().then((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, (err) => {
        console.log(err);
      });

      this.displayMsg();

    }

    displayMsg() {
      this.db.database.ref('/contacts/').orderByChild('username').equalTo(this.username).once('value').then(snapshot => {
        snapshot.forEach(ctc => {
          this.contactsFound.push(ctc.val())
        })
      });

    }

    sendMessage() {
      this.myDate = newDate();
      this.db.list('/chat').push({
        username: this.username,
        message: this.message,
        latitude: this.latitude,
        longitude: this.longitude,
        dEnvoi : this.myDate.valueOf()/1000,
        dSupp : (this.myDate.valueOf()/1000 + 86400),
        number: this.ownNumber
      }).then( () => {
        // message is sent
      });
      this.message = '';
    }

    // convDeg2Rad(x) {
    //   this.distance = Math.PI * x / 180;
    // }

    // ionViewDidLoad() {
    //   this.db.list('/chat').push({
    //     specialMessage: true,
    //     message: `${this.username} has joined the room`
    //   });
    // }
    //
    // ionViewWillLeave(){
    //   console.log("ionViewWillLeave");
    //   this.s.unsubscribe();
    //   this.db.list('/chat').push({
    //     specialMessage: true,
    //     message: `${this.username} has left the room`
    //   });
    // }


}
