import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FlickrService } from './app.service';
import { IPhotoModel } from './app.model';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FlickrService]
})
export class AppComponent {
    title = 'app works!';

    filterParams = new FormControl();
    photos:Array<any>=[];

    constructor(private flickrService: FlickrService) {
//        this.photos = this.filterParams.valueChanges
//            .debounceTime(400)
//            .distinctUntilChanged()
//            .switchMap(params => this.flickrService.getPhotos(params));
        this.flickrService.getPhotos("").subscribe(res => {
            console.log(res.items);
            this.photos = res.items;
        });
    }
}
