import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

import { ActionSheetController, Platform } from 'ionic-angular'
import { Media, MediaObject } from '@ionic-native/media';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureVideoOptions} from '@ionic-native/media-capture';

import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import firebase from 'firebase';

import { CartePage } from '../carte/carte';

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
  file: File;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
    public navParams: NavParams, public geolocation: Geolocation, public platform: Platform,
    private camera: Camera, private media: Media, private mediaCapture : MediaCapture,
    public actionSheetCtrl: ActionSheetController) {
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
      // this.removeMessages();

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

    takePhoto(){
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation : true
      }

      this.camera.getPicture(options).then((imageData) => {
         var imageURL = 'data:image/jpeg;base64,' + imageData;
         this.uploadImage(imageURL);
      }, (err) => {
         console.log(err);
      });
    }

    getVideo(){
      this.mediaCapture.captureVideo().then((data: MediaFile[]) =>{
        console.log("je rentre");
        this.uploadVideo(data);
        console.log("je sors");
     });
   }

   makeVideo(){
      let options: CaptureVideoOptions = { duration: 15 };
      this.mediaCapture.captureVideo(options)
      .then((videoData: MediaFile[])=>{
      let fpath = videoData[0].fullPath;
      let name = videoData[0].name;
      let path = fpath.replace(name, "");
        //read as text
        this.file.readAsDataURL(path, name)
        .then(dataText=>{
          this.uploadVideo(dataText);
        })
        .catch(err =>{
        });
      })
      .catch(err=>{
      })
      }

      uploadVideo(video){
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child('videos');
        console.log("je suis pas loin");
        let promise = new Promise((resolve, reject) => {
          if ( video ) {
            const almostUniqueFileName = Date.now().toString();
            const picturesRef = firebase.storage().ref('/videos/' + almostUniqueFileName +'+mp4'); //On crée une réference storage dans la database
            picturesRef.putString(video, 'data_url').then(data => { //On push dans firebase storage
              picturesRef.getDownloadURL().then(url => {
                this.db.list('/chat').push({
                  username : this.username,
                  urlVideo : url,
                  duree : this.myDate
                })
                //imageRef.child('images').set(url);
                resolve();
              });
            }).catch(err => console.log("error", err));
          } else {
            reject();
          }
        });
        return promise;
      }


      uploadImage(image) {
        this.myDate = new Date();
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child('images');
        let promise = new Promise((resolve, reject) => {
          if ( image ) {
            const almostUniqueFileName = Date.now().toString();
            const picturesRef = firebase.storage().ref('/images/' + almostUniqueFileName ); //On crée une réference storage dans la database
            picturesRef.putString(image, 'data_url').then(data => { //On push dans firebase storage
              picturesRef.getDownloadURL().then(url => {
                this.db.list('/chat').push({
                  username : this.username,
                  urlImage : url,
                  latitude: this.latitude,
                  longitude: this.longitude,
                  dEnvoi : this.myDate.valueOf()/1000,
                  dSupp : (this.myDate.valueOf()/1000 + 86400),
                  number: this.ownNumber

                })
                //imageRef.child('images').set(url);
                resolve();
              });
            }).catch(err => console.log("error", err));
          } else {
            reject();
          }
        });
        return promise;
      }


      getPhoto(){
        const optionsGallery: CameraOptions = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth : 918/2,
          targetHeight : 960/2,
          allowEdit : true
        }

        this.camera.getPicture(optionsGallery).then((imageData) => {
           var imageURL = 'data:image/jpeg;base64,' + imageData;
           this.uploadImage(imageURL);
        }, (err) => {
           console.log(err);
        });
      }

    // removeMessages() {
    //   let date = new Date();
    //   let idArray = [];
    //   //this.db.database.ref().child('chat').orderByKey().on('child_added', function(snapshot) {
    //   this.db.database.ref('/chat/').orderByChild('dSupp').endAt(date.valueOf()/1000).on('value', function(snapshot) {
    //     var arr = snapshot.val();
    //     var arr2 = Object.keys(arr);
    //     console.log(arr2);
    //     for(var i=0; i<arr2.length; i++) {
    //       idArray[i] = arr2[i];
    //     }
    //
    //     console.log(idArray.length);
    //
    //     for(var j=0; j<idArray.length; j++) {
    //       this.db.database.ref('/chat/' + idArray[j]).orderByName('dSupp').endAt(date).on('value', function(snapshot) {
    //         console.log(snapshot.val())
    //       });
    //     }
    //   })
    //     console.log(snapshot.val());
    //     console.log(snapshot.key);
    //     console.log(snapshot.val().dEnvoie);
    //     console.log(snapshot.val().dSupp);
    //     idArray.push(snapshot.key);
    //     console.log(idArray);
    //     if(snapshot.val() !== null)
    //     this.toto = snapshot;
    //     console.log(idArray.length - 1);
    //   console.log(this.tampon);
    //
    //
    //   this.db.database.ref('/chat/' + id).remove();
    // }

    sendMessage() {
      this.myDate = new Date();
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

    chooseElem(){
      let actionsheet = this.actionSheetCtrl.create({
        title:"Choisir le type",
        buttons:[{
          text: 'Galerie',
          handler: () => {
            this.getPhoto();
          }
        },{
        text: 'Photo',
        handler: () => {
          this.takePhoto();
        }
        },{text: 'Vidéo',
        handler: () =>{
          this.makeVideo();
        }}]
      });
      actionsheet.present();
    }


    goMap(){
      this.navCtrl.push(CartePage,{
        username : this.username
      });
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
