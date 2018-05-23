import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, FirebaseListObservable } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

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
  message: string = '';
  s;
  messages: object[] = [];
  latitude: double;
  longitude: double;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
      console.log(this.navParams);
      this.username = this.navParams.get('username');
      this.s = this.db.list('/chat').valueChanges().subscribe( data => {
        if(this.username == "dodo")
          this.messages = data;
      });
    }

    sendMessage() {

      this.db.list('/chat').push({

        username: this.username,
        message: this.message,
        latitude = this.latitude,
        longitude = this.longitude

      }).then( () => {
        // message is sent
      }).catch( () => {
        // some error. maybe firebase is unreachable
      });
      this.message = '';
    }

    // ionViewDidLoad() {
    //   this.db.list('/chat').push({
    //     specialMessage: true,
    //     message: `${this.username} has joined the room`
    //   });
    // }

    ionViewWillLeave(){
      console.log("ionViewWillLeave");
      this._chatSubscription.unsubscribe();
      this.db.list('/chat').push({
        specialMessage: true,
        message: `${this.username} has left the room`
      });
    }

  }
