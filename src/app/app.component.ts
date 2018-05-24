import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { CartePage } from '../pages/carte/carte';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    var config = {
      apiKey: "AIzaSyBV-lDTV8qeqkzg-Y9eBwVweCgXyUEyBpQ",
      authDomain: "joddle-30e4b.firebaseapp.com",
      databaseURL: "https://joddle-30e4b.firebaseio.com",
      projectId: "joddle-30e4b",
      storageBucket: "joddle-30e4b.appspot.com",
      messagingSenderId: "541935281606"
    };

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // firebase.initializeApp(config);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
