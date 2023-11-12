import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gioithieu',
  templateUrl: './gioithieu.component.html',
  styleUrls: ['./gioithieu.component.scss']
})
export class GioithieuComponent implements OnInit {
  map!: google.maps.Map;
  loader: any = new Loader({ 
    apiKey: environment.apiKeyMap,
    libraries: ["places"],
    language: 'vi',
    region: 'VN'
  });
  location: any = { lat: 21.0204117, lng: 105.7496329 };
  constructor() { }

  ngOnInit(): void {
    this.loadmap();
  }

  loadmap(){
    this.loader.load().then(() => {
      const mapOptions = {
        center: { lat: this.location.lat, lng: this.location.lng },
        zoom: 17,
        gestureHandling: 'greedy'
      }

      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);
     
      const marker = new google.maps.Marker({
        position: { lat: this.location.lat, lng: this.location.lng },
        map: this.map,
        title: "Trường cao đẳng công nghệ cao Hà Nội",
      })
     
    }).catch(e => {
      console.log(e)
    });
  }
}
