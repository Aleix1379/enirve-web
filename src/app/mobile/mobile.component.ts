import {Component, OnInit, ViewEncapsulation} from '@angular/core';

enum MobileOs {
  ANDROID,
  IOS
}

@Component({
  templateUrl: './mobile.component.html',
  styleUrls: ['../app.component.css', './mobile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MobileComponent implements OnInit {

  images: string [];
  imageSelected: string;

  constructor() {
  }

  private static getImages(mobileOS: MobileOs): string [] {
    const path = 'assets/images/';
    let name: string;
    const images: string[] = [];
    if (mobileOS === MobileOs.ANDROID) {
      name = 'android-';
    } else {
      name = 'ios-';
    }
    for (let i = 1; i <= 6; i++) {
      images.push(`${path}${name}${i}.png`);
    }
    return images;
  }

  ngOnInit() {
    let images = MobileComponent.getImages(MobileOs.ANDROID);
    this.images = images.concat(MobileComponent.getImages(MobileOs.IOS));

    console.log({'this.images': this.images});

  }

  selectImage(image: string): void {
    console.log(`imatge: ${image}`);
    this.imageSelected = image;
  }

}
