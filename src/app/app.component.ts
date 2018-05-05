import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Google Maps Yeison lopez';
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  marker: any;
  positionFin: any;

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(6.235304600000001, -75.60764019999999),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
	this.positionFin = new google.maps.LatLng(6.2779398, -75.57198629999999)
  }


setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)    
}


findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
        this.showPositionFin();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    
  }

  showPosition(position) {
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Posición Actual'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }
   
   showPositionFin() {
   	
    let location = new google.maps.LatLng(6.2779398, -75.57198629999999);
    this.map.panTo(location);

    
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Posición Final'
      });
    
   this.marker.setPosition(location);
  }

}
