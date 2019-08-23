import {HostListener, Injectable} from '@angular/core';
import {ScreenSizes} from '../../interfaces/ScreenSizes';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private screenHeight: number;
  private screenWidth: number;

  private sizes: ScreenSizes = {
    phone: {max: 600},
    tabPort: {min: 601, max: 900},
    tabLand: {min: 901, max: 1200},
    desktop: {min: 1201, max: 1800},
    bigDesktop: {min: 1801}
  };

  constructor() {
    this.getScreenSize();
  }


  isPhone(): boolean {
    return this.screenWidth <= this.sizes.phone.max;
  }

  isTabPort(): boolean {
    return this.screenWidth[`between`](this.sizes.tabPort.min, this.sizes.tabPort.max);
  }

  isTabLand(): boolean {
    return this.screenWidth[`between`](this.sizes.tabLand.min, this.sizes.tabLand.max);
  }

  isDesktop(): boolean {
    return this.screenWidth[`between`](this.sizes.desktop.min, this.sizes.desktop.max);
  }

  isBigDesktop(): boolean {
    return this.screenWidth >= this.sizes.bigDesktop.min;
  }

  getWith(): number {
    return this.screenWidth;
  }

  getHeight() {
    return this.screenHeight;
  }

  @HostListener('window:resize', ['$event'])
  private getScreenSize(event?) {
    console.log(`window:resize....`);
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    console.log(`this.screenHeight: ${this.screenHeight}`);
    console.log(`this.screenWidth: ${this.screenWidth}`);
  }
}
