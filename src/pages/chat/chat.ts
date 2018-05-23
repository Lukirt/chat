import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Contacts, Contact, ContactFieldType, ContactName } from '@ionic-native/contacts';


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
  latitude: double;
  longitude: double;
  distance: double;
  contactsFound = [];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    public navParams: NavParams, private contacts: Contacts) {
      console.log(this.navParams);
      // this.fetchDeviceContact('');
      this.username = this.navParams.get('username');
      console.log(this.db);
      console.log(this.db.list('/chat/'));
      console.log(this.db.list('/chat/').valueChanges());
      console.log(this.db.list('/chat/').valueChanges().subscribe());

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

    fetchDeviceContact(g){

	 	var options = {
		    filter : g,
		    multiple:true,
		    hasPhoneNumber:true
		};

    this.contacts.find(["displayName"], options).then((conts) => {
      this.contactsFound = conts;
      console.log(this.contactsFound);
      for(var contact of this.contactsFound) {
        console.log(contact);
        this.db.list('/contacts').push({
          // Ajouter le numéro de téléphone de la personne qui a le 06
          number: contact.phoneNumbers,
          name: contact.displayName,
          }).then( () => {
            // Contact ajouté
          });
        }
      })
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
