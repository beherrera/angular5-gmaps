import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


interface Category{
  id:string;
  name:string;
}
export interface Product{
  id:string;
  category:Category;
  name:string;
  eachPrice:number;
  description:string;
  medical_characteristics:string;
  photos?:any[];  
  volume:string;
  platform:string;
 
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular Google Maps Yeison lopez';
  @ViewChild('map') gmapElement: any;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  marker: any;
  positionFin: any;
  drawRoute;
  origen;
  final;
  myLatLng;
  centrarmap = {lat:6.231928, lng:-75.60116719999996}
  

  products:any[];
  urlApi:string="http://13.90.130.197/product";
  show:boolean = false;

   product: Product = {
     name: '',
     description:'',
     category:{ id:'',name:''},
     eachPrice:0,
     id:'',
     medical_characteristics:'',
     photos:[''],
     platform:'',
     volume:'',
     
  };


  constructor(private http:Http, private httpC:HttpClient) { }

  ngOnInit() {
   
   this.getProduct();

    var mapProp = {
      center: new google.maps.LatLng(this.centrarmap.lat, this.centrarmap.lng),
      zoom:8,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    
  }
  


  getProduct(){
       
              
      let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJncml0aWNvc3VhdmVAZ21haWwuY29tIiwiZXhwIjoxNTI4NTg4ODA3fQ.7KFnvgqbGFLv0YP69Q6gCvcLsRE7pQR5PuuN0ti50Sc1rThASdWxsoASIzrAMNL1dStNaIs2DFpc4fKYFNigHg';  
      let headers = new Headers({'Authorization':`Bearer ${token}`,'Content-Type':'application/json','Accept': 'application/json'});



      return this.http.get(this.urlApi,{headers:headers})
         .map(res=>{
                 console.log(res); 
                this.products = res.json();

                
             }).subscribe(res=>{


           }); 

      

      //return this.http.get(this.urlApi,{headers:headers})
            
    }


  
  showProduct(product:Product){
    
      this.origen = {lat:6.2500271, lng:-75.5681333};
     this.final = {lat:6.235783691727386, lng:-75.57975769042969};
      this.show = true;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;

      var mapProp = {
        center: new google.maps.LatLng(this.centrarmap.lat, this.centrarmap.lng),
        zoom:8,
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      
      directionsDisplay.setMap(this.map);
     
       this.drawRoute = {
         origin: this.origen,
         destination: this.final,
         travelMode: 'DRIVING'
        }
      
        directionsService.route(this.drawRoute, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            // Muestra la Ruta en el Mapa
            directionsDisplay.setDirections(response);
          }
        });
       
      this.myLatLng = {lat: 6.251125509432778, lng: -75.5696453918955};
      var marker = new google.maps.Marker({
      position: this.myLatLng,
      map: this.map,
      title: 'Hello World!'
        });

      this.product= {
     name: product.name,
     description:product.description,
     category:{ id:product.category.id,name:product.category.name},
     eachPrice:product.eachPrice,
     id:product.id,
     medical_characteristics:'',
     photos:product.photos,
     platform:product.platform,
     volume:product.volume,
     

    };




  }



}
