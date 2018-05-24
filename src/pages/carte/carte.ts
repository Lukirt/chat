import { Component , ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  LatLng,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-carte',
  providers: [GoogleMaps],
  templateUrl: 'carte.html'
})
export class CartePage {
  //public markers: Marker[];
  username : string = '';
  @ViewChild('map') mapElement :ElementRef;
  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams : NavParams, public geolocation: Geolocation) {
    this.username = this.navParams.get('username');
 }

  ionViewDidLoad() {
    this.loadMap();
  }


  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  // initMarkers() {
  //   var mlt = {lat: -25.6, lng:131.5};
  //   var marker = new google.maps.Marker({
  //     position : mlt,
  //     map : this.map,
  //     title : this.username
  //   })
	// 	this.markers = [new Marker(pos,this.map,user),
  //   new Marker()];
	// }
  //ca maaaaaarche
  // loadMap(){
  //
  // let latLng = new google.maps.LatLng(-34.9290, 138.6010);
  //
  // let mapOptions = {
  //   center: latLng,
  //   zoom: 15,
  //   //mapTypeId: google.maps.MapTypeId.ROADMAP
  // }
  //
  // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //
  // }

  // loadMap() {
  // //const location : new google.maps.LatLng(43,-89);
  //  let mapOptions: GoogleMapOptions = {
  //    camera: {
  //       target: {
  //         lat: 43.0741904,
  //         lng: -89.3809802
  //       },
  //       zoom: 18,
  //       tilt: 30
  //     }
  //   };
  //   //this.map = new google.maps.Map(this.mapRef.nativeElement,mapOptions);
  //  this.map = GoogleMaps.create('map_canvas', mapOptions);
  //
  //  //Wait the MAP_READY before using any methods.
  //  this.map.one(GoogleMapsEvent.MAP_READY)
  //    .then(() => {
  //       console.log('Map is ready!');
  //
  //       // Now you can use all methods safely.
  //       this.map.addMarker({
  //         title: 'Ionic',
  //         icon: 'blue',
  //         animation: 'DROP',
  //         position: {
  //           lat: 43.0741904,
  //           lng: -89.3809802
  //         }
  //       })
  //       .then(marker => {
  //         marker.on(GoogleMapsEvent.MARKER_CLICK)
  //           .subscribe(() => {
  //             alert('clicked');
  //           });
  //       });
  //
  //    });
  // }
}
