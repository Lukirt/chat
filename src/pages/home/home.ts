import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ChatPage } from '../chat/chat';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Contacts, Contact, ContactFieldType, ContactName } from '@ionic-native/contacts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    username: string = '';
    password: string = '';
    ownNumber;
    usernameSU: string = '';
    passwordSU: string = '';
    dataBase: any;
    contactsFound = [];


  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    private alertCtrl: AlertController, private contacts: Contacts) {
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
              this.ownNumber = usrname.number;
              this.navCtrl.push(ChatPage, {
                username: this.username,
                ownNumber: this.ownNumber,
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

          var options = {
              filter : '',
              multiple:true,
              hasPhoneNumber:true
          };

          let usr = this.usernameSU;

          // Ajout de l'utilisateur
          this.db.list('/user').push({
            username: this.usernameSU,
            password: this.passwordSU,
            number: this.ownNumber
          }).then( () => {
            // Ajout des contacts
            this.contacts.find(["displayName"], options).then((conts) => {
              this.contactsFound = conts;
              // Ajout des contacts un par un
              for(var contact of this.contactsFound) {
                this.db.list('/contacts').push({
                  number: contact.phoneNumbers,
                  name: contact.displayName,
                  username: usr
                  }).then( () => {
                    // Contact ajouté
                  });
                }
              })
          });
          // On remet les champs vides
          this.ownNumber = '';
          this.passwordSU = '';
          this.usernameSU = '';
        } else {
            this.showAlert('Error', 'Invalid Username');
        }
    }

    // checkConnexion(username) {
    //     let accountArray = [];
    //     this.dataBase.ref('/user/').orderByChild('username').equalTo(username).once('value').then(snapshot => {
    //       snapshot.forEach(account => {
    //         accountArray.push(account.val());
    //       })
    //       for(var usrname of accountArray) {
    //         // console.log(usrname.username);
    //         // console.log(this.username);
    //         // console.log(usrname.password);
    //         // console.log(this.password);
    //         if(usrname.username == this.username) {
    //           if(usrname.password == this.password) {
    //             console.log("Pseudo et mot de passe corrects")
    //             this.navCtrl.push(ChatPage, {
    //               username: this.username
    //             });
    //           } else {
    //             this.showAlert('Error', 'Invalid Password');
    //           }
    //         } else {
    //             this.showAlert('Error', 'Invalid Username');
    //         }
    //       }
    //     });
    // }

    // fetchDeviceContact(g){
    //
    // var options = {
    //     filter : g,
    //     multiple:true,
    //     hasPhoneNumber:true
    // };
    // console.log(this.usernameSU);
    // this.contacts.find(["displayName"], options).then((conts) => {
    //   this.contactsFound = conts;
    //   console.log(this.contactsFound);
    //   for(var contact of this.contactsFound) {
    //     console.log(contact);
    //     this.db.list('/contacts').push({
    //       // Ajouter le numéro de téléphone de la personne qui a le 06
    //       username: this.usernameSU,
    //       number: contact.phoneNumbers,
    //       name: contact.displayName,
    //       }).then( () => {
    //         // Contact ajouté
    //       });
    //     }
    //   })
    // }

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
