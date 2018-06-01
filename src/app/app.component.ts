import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

import * as moment from 'moment';

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
  
intervalo:any;
  ListDirs: any[];
  products:any[];
  latLng:any;
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
               
                this.products = res.json();
             }).subscribe(res=>{
           }); 
    }


  
  showProduct(product:Product){
    
        this.ListDirs = [
         
    { lat:6.250270954618633, lng: -75.56842998998036, date: "2015-06-17 14:10:36" },
    { lat:6.250429907901519, lng: -75.56837951561647, date: "2015-06-17 14:12:36"},
    { lat:6.250564864760729, lng:-75.56842828298613, date: "2015-06-17 14:19:36" },
    { lat:6.25060383609733, lng: -75.56854142337215, date: "2015-06-17 14:26:36"},
    { lat:6.25067480259319, lng: -75.5686787036393, date: "2015-06-17 14:27:36"},
    { lat:6.250708441395095, lng:-75.56877306856222, date: "2015-06-17 14:28:36"},
    { lat:6.250766076562103, lng: -75.56887011569415, date: "2015-06-17 14:29:36"},
    { lat:6.250823711722749, lng: -75.56900203154328, date: "2015-06-17 14:32:36"},
    { lat:6.250873348089851, lng: -75.56909907867521, date: "2015-06-17 14:35:36"},
    { lat:6.250925650714401, lng:-75.56922831231532, date: "2015-06-17 14:37:36" },
    { lat:6.250987558524169, lng: -75.56934901245768, date: "2015-06-17 14:39:36"},
    { lat:6.251053192444991, lng: -75.56947288167976, date: "2015-06-17 14:42:36"},
    { lat:6.251081498699873, lng:-75.56955651776661, date: "2015-06-17 14:44:36"},
    { lat:6.251174196819546, lng: -75.56973793276484, date: "2015-06-17 14:46:36"},
    { lat:6.251233165065529, lng:-75.56985643756889, date: "2015-06-17 14:48:36" },
    { lat:6.251267943460775, lng: -75.56994681293838, date: "2015-06-17 14:50:36" },
    { lat:6.251306442861838, lng: -75.57002663669459, date: "2015-06-17 14:52:36" },
    { lat:6.25136909997309, lng: -75.5702177440869, date: "2015-06-17 14:54:36" },
    { lat:6.251502412950756, lng: -75.57047255394332, date: "2015-06-17 14:56:36" },
    { lat:6.251561070650177, lng: -75.57064153311126, date: "2015-06-17 14:58:36" },
    { lat:6.2516677209959015, lng: -75.57086415645949, date: "2015-06-17 14:59:36" },
    { lat:6.251744155319239, lng: -75.57101100683212, date: "2015-06-17 15:02:36" },
    { lat:6.251840140597759, lng: -75.57117462158203, date: "2015-06-17 15:04:36" },
    { lat:6.251920128316415, lng: -75.57130604982376, date: "2015-06-17 15:06:36" },
    { lat:6.25198411848252, lng: -75.57144284248352, date: "2015-06-17 15:08:36" },
    { lat:6.252042776127911, lng: -75.57153135538101, date: "2015-06-17 15:10:36" },
    { lat:6.252064106179153, lng: -75.57159304618835, date: "2015-06-17 15:12:36" },
    { lat:6.252083558052832, lng:-75.57162148162695, date: "2015-06-17 15:14:36" },
    { lat:6.251980195067321, lng: -75.5717780249646, date: "2015-06-17 15:16:36"  },
    { lat:6.251834171942764, lng: -75.57184605540476, date: "2015-06-17 15:18:36" },
    { lat:6.251600162247229, lng:-75.57197577665227, date: "2015-06-17 15:20:36"  },
    { lat:6.251441830339221, lng: -75.57206745936617, date: "2015-06-17 15:22:36" },
    { lat:6.2512888309039285, lng: -75.57215645987105, date: "2015-06-17 15:24:36" },
    { lat:6.251117167595965, lng: -75.57225350700298, date: "2015-06-17 15:26:36" },
    { lat:6.250945504231681, lng: -75.5723290964628, date: "2015-06-17 15:28:36" },
    { lat:6.250791482029795, lng: -75.57240785573902, date: "2015-06-17 15:30:36" },
    { lat:6.250491837884766, lng: -75.57256391146927, date: "2015-06-17 15:32:36" },
    { lat:6.250347655291581, lng: -75.57265617617304, date: "2015-06-17 15:34:36" },
         ]


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
         travelMode: 'DRIVING',
         unitSystem: google.maps.UnitSystem.METRIC
        }
      
        directionsService.route(this.drawRoute, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            // Muestra la Ruta en el Mapa
            directionsDisplay.setDirections(response);
          }
        });
       






this.apper();

//for (var i = 0, length = this.ListDirs.length; i < length; i++) {}
       
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

  x = 0;
 duration_ = 0;
 


//recorre el json de lat long y fecha
 apper(){
   var interval;
         
          var now = moment(this.ListDirs[this.x+1].date); //todays date
         var end = moment(this.ListDirs[this.x].date); // another date
         var duration = moment.duration(now.diff(end));
         var mins = duration.asMinutes();
        var secuencia = mins*1000;
        //console.log(mins.toString()); 
        //console.log(secuencia);     

   this.duration_ += 1000;

  interval = setInterval(()=> { 
              
              clearInterval(interval);
              if(this.x<this.ListDirs.length){
                this.apper();
             
              }else{
                 this.x = -1;
                
              }
              
             }, secuencia);   
                 
                 let data = this.ListDirs[this.x],  
                    latLng = new google.maps.LatLng(data.lat, data.lng); 
                // Creating a marker and putting it on the map
                let marker = new google.maps.Marker({
                  position: latLng,
                  map: this.map,
                  title: ''
                  
                  });

                console.log(this.x.toString());

   this.x ++;

 }





}
