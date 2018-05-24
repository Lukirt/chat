import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Contacts, Contact, ContactFieldType, ContactName } from '@ionic-native/contacts';


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
  // latitude: double;
  // longitude: double;
  // distance: double;
  contactsFound = [];
  tampon = [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    public navParams: NavParams) {
      console.log(this.navParams);
      // let key = this.db.list('/user/').push().key;
      // console.log(key);
      // this.db.database.ref('/user/').orderByChild('username').equalTo('to').once('value').then(snapshot => {
      //   console.log(snapshot.val());
      //   snapshot.forEach(user => {
      //     this.tampon.push(snapshot.val());
      //   });
      // });
      //this.db.list('/user/-LDCP5dBuTPpuMsY2zkp').remove();
      this.username = this.navParams.get('username');
      this.s = this.db.list('/chat/').valueChanges().subscribe( data => {
        this.messages = data;
      });

    }

    sendMessage() {
      this.db.list('/chat').push({

        username: this.username,
        message: this.message,
        // latitude = this.latitude,
        // longitude = this.longitude

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
