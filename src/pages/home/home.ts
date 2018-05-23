import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ChatPage } from '../chat/chat';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    username: string = '';
    password: string = '';
    // ownNumber;
    dataBase: any;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, private alertCtrl: AlertController) {
    console.log(this.db);
    this.dataBase = this.db.database;
  }

    showAlert(title: string, message: string) {
      let alertBox = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
      });
      alertBox.present();
    }

    loginUser(username) {
      let accountArray = [];
      this.dataBase.ref('/user/').orderByChild('username').equalTo(username).once('value').then(snapshot => {
        snapshot.forEach(account => {
          accountArray.push(account.val());
        })
        for(var usrname of accountArray) {
          // console.log(usrname.username);
          // console.log(this.username);
          // console.log(usrname.password);
          // console.log(this.password);
          if(usrname.username == this.username) {
            if(usrname.password == this.password) {
              console.log("Pseudo et mot de passe corrects")
              this.navCtrl.push(ChatPage, {
                username: this.username
              });
            } else {
              this.showAlert('Error', 'Invalid Password');
            }
          } else {
              this.showAlert('Error', 'Invalid Username');
          }
        }
      });
    }

    signUp() {
        if(/^[a-zA-Z0-9]+$/.test(this.usernameSU)) {
          this.db.list('/user').push({
            username: this.usernameSU,
            password: this.passwordSU,
            number: this.ownNumber
          }).then( () => {
            // message is sent
          });
          this.ownNumber = '';
          this.passwordSU = '';
          this.usernameSU = '';
        } else {
            this.showAlert('Error', 'Invalid Username');
        }
    }

    checkConnexion(username) {
        let accountArray = [];
        this.dataBase.ref('/user/').orderByChild('username').equalTo(username).once('value').then(snapshot => {
          snapshot.forEach(account => {
            accountArray.push(account.val());
          })
          for(var usrname of accountArray) {
            // console.log(usrname.username);
            // console.log(this.username);
            // console.log(usrname.password);
            // console.log(this.password);
            if(usrname.username == this.username) {
              if(usrname.password == this.password) {
                console.log("Pseudo et mot de passe corrects")
                this.navCtrl.push(ChatPage, {
                  username: this.username
                });
              } else {
                this.showAlert('Error', 'Invalid Password');
              }
            } else {
                this.showAlert('Error', 'Invalid Username');
            }
          }
        });
    }
    //
    // checkBdd() {
    //   let messagesArray = [];
    //   this.dataBase.ref('/chat/').orderByChild('username').equalTo('Toto').once('value').then(snapshot => {
    //     snapshot.forEach(message => {
    //       let msg = message.val();
    //       messagesArray.push(msg);
    //       console.log(messagesArray);
    //     })
    //     for(var int of messagesArray) {
    //       console.log(int.message);
    //     }
    //   });
    //
    //
    //   query = events.orderByChild('username').equalTo('toto');
    //   query.on('value', snap => {
    //     console.log(snap.key);
    //   }
    // }


}
