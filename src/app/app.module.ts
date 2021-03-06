import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { CartePage } from '../pages/carte/carte';

import { GoogleMaps} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Media, MediaObject } from '@ionic-native/media';
import { Camera } from '@ionic-native/camera';
import { MediaCapture, MediaFile } from '@ionic-native/media-capture';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Contacts, Contact, ContactFieldType, ContactName } from '@ionic-native/contacts';

export const config = {
  apiKey: "AIzaSyBV-lDTV8qeqkzg-Y9eBwVweCgXyUEyBpQ",
  authDomain: "joddle-30e4b.firebaseapp.com",
  databaseURL: "https://joddle-30e4b.firebaseio.com",
  projectId: "joddle-30e4b",
  storageBucket: "joddle-30e4b.appspot.com",
  messagingSenderId: "541935281606"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage,
    CartePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage,
    CartePage,
  ],
  providers: [
    StatusBar,
    Camera,
    MediaCapture,
    Media,
    SplashScreen,
    Contact,
    Contacts,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
