import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

import { FlickrService } from "./app.service";

import { Observable } from "rxjs";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    providers: [FlickrService]
})
export class AppComponent {
    filterParams = new FormControl();
    photos: Array<any>=[];

    constructor(private flickrService: FlickrService) {
        this.filterParams.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(params => this.flickrService.getPhotos(params))
            .subscribe(res => {
                console.log(res.items);
                this.photos = res.items;
            });
    }
    replaceCharAtIndex(item: string, index: number, char: any) {
        let a = item.split("");
        a[index] = char;
        return a.join("");
    }

    imageClicked(imageUrl: string) {
        let newUrl = this.replaceCharAtIndex(imageUrl, imageUrl.length - 5, 'c');
        window.open(newUrl, '_blank');
    }
}