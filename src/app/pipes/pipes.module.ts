import {NgModule} from '@angular/core';
import {SafePipe} from './safe/safe.pipe';
import { ImageDownloaderPipe } from './imageDownloader/image-downloader.pipe';


@NgModule({
  declarations: [
    SafePipe,
    ImageDownloaderPipe,
  ],
  imports: [],
  exports: [
    SafePipe,
    ImageDownloaderPipe,
  ]
})
export class PipesModule {
}
