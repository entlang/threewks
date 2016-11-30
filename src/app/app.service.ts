import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FlickrService {
//    API_BASE = 'https://api.flickr.com/services/feeds/photos_public.gne?method=flickr.people.getPublicPhotos&format=json&callback=JSONP_CALLBACK';
    API_BASE = 'https://api.flickr.com/services/feeds/photos_public.gne';

    constructor(private http: Http, private jsonp: Jsonp) { }

    getPhotos(filter: string = ""): Observable<any> {
        let params = new URLSearchParams();
        params.set('tags', filter); // the user's search value
        params.set('method', 'flickr.people.getPublicPhotos');
        params.set('format', 'json');
        params.set('jsoncallback', 'JSONP_CALLBACK');

        return this.jsonp.get(this.API_BASE, { search: params })
            .map(response =>response.json())
            .catch(this.errorHandler);
    }

    private errorHandler(error) {
        console.log('error', error);
        return Observable.throw(error);
    }
}