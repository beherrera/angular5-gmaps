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
  x ;
 //duration_ = 0;


  myLatLng;
  centrarmap = {lat:6.231928, lng:-75.60116719999996}
  

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
        this.x = 0;
        //Json de lat lng y date
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
          { lat:6.250114246555376, lng: -75.57275376288828, date: "2015-06-17 15:38:36" },
          { lat:6.2499382729506765, lng: -75.5728476402038 , date: "2015-06-17 15:40:36" },
          { lat:6.249653804884941, lng: -75.57299315929413, date: "2015-06-17 15:42:36" },
          { lat:6.249552486666967, lng: -75.57304412126541, date: "2015-06-17 15:44:36" },
          { lat:6.249845776191512, lng: -75.57404458522797, date: "2015-06-17 15:48:36" },
          { lat:6.249885770204861, lng: -75.57414248585701, date: "2015-06-17 15:49:36" },
          { lat:6.249923097947872, lng: -75.5742859840393, date: "2015-06-17 15:50:36" },
          { lat:6.249995087159041, lng: -75.5745555460453, date: "2015-06-17 15:50:59" },
          { lat:6.250037747427652, lng: -75.57468563318253, date: "2015-06-17 15:51:10" },
          { lat:6.250048412494259, lng: -75.57487741112709, date: "2015-06-17 15:52:36" },
          { lat:6.250075075159824, lng: -75.57500883936882, date: "2015-06-17 15:52:50" },
          { lat:6.250112402889351, lng: -75.57515636086464, date: "2015-06-17 15:53:10" },
          { lat:6.249979089557409, lng: -75.5752395093441, date: "2015-06-17 15:53:59" },
          { lat:6.2495789956265915, lng: -75.57524218134034, date: "2015-06-17 15:54:20" },
          { lat:6.249301703575338, lng: -75.57524754575837, date: "2015-06-17 15:54:50" },
          { lat:6.248854432536827, lng: -75.57524221614204, date: "2015-06-17 15:55:00" },
          { lat:6.248198529039234, lng: -75.57525026276909, date: "2015-06-17 15:55:30" },
          { lat:6.247691936344266, lng:-75.5752529449781, date: "2015-06-17 15:56:00" },
          { lat:6.247212005970397, lng: -75.57526233270966, date: "2015-06-17 15:56:15" },
          { lat:6.246348130188467, lng: -75.57531061247192, date: "2015-06-17 15:56:45" },
          { lat:6.245119971156246, lng: -75.5753615744432, date: "2015-06-17 15:57:00" },
          { lat:6.244272089698731, lng: -75.57541790083252, date: "2015-06-17 15:57:30" },
          { lat:6.243599626978114, lng: -75.57549032047592, date: "2015-06-17 15:58:00" },
          { lat:6.243103695041129, lng: -75.57549300268494, date: "2015-06-17 15:58:30" },
          { lat:6.242722413716509, lng: -75.57547825053535, date: "2015-06-17 15:59:00" },
          { lat:6.242338465808456, lng: -75.57545276954971, date: "2015-06-17 15:59:30" },
          { lat:6.241647892126637, lng:-75.57545947507225 , date: "2015-06-17 16:00:00" },
          { lat:6.241647892126637, lng: -75.57545679286324, date: "2015-06-17 16:01:36" },
          { lat:6.238650951779614, lng: -75.57579475119911, date: "2015-06-17 16:01:50" },
          { lat:6.2372752774904265, lng: -75.5761335292392, date: "2015-06-17 16:02:36" },
          { lat:6.234310308305135, lng: -75.57746390491059, date: "2015-06-17 16:03:36" },
          { lat:6.233307760975383, lng: -75.57776967673828, date: "2015-06-17 16:04:36" },
          { lat:6.232801153883201, lng: -75.57793182931732, date: "2015-06-17 16:05:36" },
          { lat:6.232673168856186, lng: -75.57835830055069, date: "2015-06-17 16:06:36" },
          { lat:6.232859813676801, lng: -75.57912809453796, date: "2015-06-17 16:07:36" },
          { lat:6.233067789255863, lng: -75.57996762595963, date: "2015-06-17 16:08:36" },
          { lat:6.233617057696402, lng: -75.58020634256195, date: "2015-06-17 16:09:36" },
          { lat:6.234432960240526, lng: -75.58130873046707, date: "2015-06-17 16:10:36" },
          { lat:6.236422050666051, lng: -75.58188004098724, date: "2015-06-17 16:11:36" },
          { lat:6.237275277490465, lng: -75.58145625196289, date: "2015-06-17 16:12:36" },
          { lat:6.237541910588305, lng: -75.58062476716827, date: "2015-06-17 16:13:36" },
          { lat:6.23709396690646, lng:-75.5797825535376,    date: "2015-06-17 16:14:36" },
          { lat:6.236454046697049, lng: -75.57923001848053, date: "2015-06-17 16:15:36" },
           { lat:6.236070094196505, lng: -75.57917637430023,date: "2015-06-17 16:16:36" },
          { lat:6.235147540511137, lng: -75.57925415836166, date: "2015-06-17 16:17:36" },
          { lat:6.235136875141132, lng:-75.5798201044638 ,  date: "2015-06-17 16:18:36" },
          { lat:6.235654145336983, lng: -75.58000785909485, date: "2015-06-17 16:19:36" },
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

    //funcion recorre el json de lat long y date - saca la diferencia de date
    apper(){
         
         var interval;
         
         var now = moment(this.ListDirs[this.x+1].date); //segundo objeto date
         var end = moment(this.ListDirs[this.x].date); // primer objeto date
         var duration = moment.duration(now.diff(end));
         var mins = duration.asMinutes();
         var secuencia = mins*1000;
        //console.log(mins.toString()); 
        //console.log(secuencia);     
        //this.duration_ += 1000;

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
