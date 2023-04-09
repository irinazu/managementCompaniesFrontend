import {Component, OnInit} from '@angular/core';
import {
  AngularYandexMapsModule,
  YaApiLoaderService,
  YaConfig,
  YaEvent,
  YaGeocoderService,
  YaReadyEvent
} from 'angular8-yandex-maps';
import geocode = ymaps.geocode;
import GeoObject = ymaps.GeoObject;
import GeoObjectCollection = ymaps.GeoObjectCollection;
import IGeoObject = ymaps.IGeoObject;
import GeoObjects = ymaps.map.GeoObjects;


const mapConfig: YaConfig = {
  apikey: 'ea14d089-f726-44f0-a43c-6edd2b1f636c',
  lang: 'en_US',
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
/*
  a: number[] = [57.5258, 38.3211];
  o:any;
  constructor(private yaGeocoderService: YaGeocoderService) {
    // Don't forget to unsubscribe
  }

  b: IGeoObject | undefined;

  onMapClick(e: YaEvent<ymaps.Map>): void {
    const {target, event} = e;


    if (!target.balloon.isOpen()) {
      const coords = event.get('coords');
      ymaps.geocode(this.a, {kind: 'house', results: 1}).then(r => {*/
        // @ts-ignore
        /*!!!!!!this.o=<GeoObject>r.geoObjects.get(0).geometry.getCoordinates()
        console.log(this.o);*/
        // @ts-ignore
        /*this.o=<GeoObject>r.geoObjects.get(0);
        console.log(this.o.getAddressLine());
        console.log(this.o.getAdministrativeAreas());
        console.log(this.o.getLocalities());
        console.log(this.o.getThoroughfare());
        console.log(this.o.getPremiseNumber());*/



        // console.log((<GeoObject>r).properties.get('metaDataProperty').getObject());

      //});
      /*ymaps.geocode(coords).then(r => {
        var firstGeoObject = r.geoObjects.get(0)});*/
      //this.yaGeocoderService.geocode(this.a).subscribe(v => console.log(v.));
     /* target.balloon.open(coords, {
        contentHeader: 'Event!',
        contentBody:
          '<p>Someone clicked on the map.</p>' +
          '<p>Click coordinates: ' +
          [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(', ') +
          '</p>',
        contentFooter: '<sup>Click again</sup>',
      });
    } else {
      target.balloon.close();
    }
  }

  onMapContextMenu({target, event}: YaEvent<ymaps.Map>): void {
    target.hint.open(event.get('coords'), 'Someone right-clicked');
  }

  onMapBalloonOpen({target}: YaEvent<ymaps.Map>): void {
    target.hint.close();
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    ymaps.geocode(this.a).then(x=>{
      console.log(this.o?.properties)
    })
  }*/
}
