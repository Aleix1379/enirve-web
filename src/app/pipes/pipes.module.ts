import {NgModule} from '@angular/core';
import {SafePipe} from './safe/safe.pipe';
import { ImageDownloaderPipe } from './imageDownloader/image-downloader.pipe';
import { SortPipe } from './sort/sort.pipe';


@NgModule({
  declarations: [
    SafePipe,
    ImageDownloaderPipe,
    SortPipe,
  ],
  imports: [],
  exports: [
    SafePipe,
    ImageDownloaderPipe,
    SortPipe,
  ]
})
export class PipesModule {
}
