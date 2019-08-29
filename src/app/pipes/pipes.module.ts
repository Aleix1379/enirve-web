import {NgModule} from '@angular/core';
import {SafePipe} from './safe/safe.pipe';
import { SortPipe } from './sort/sort.pipe';
import { ServerUrlPipe } from './serverUrl/server-url.pipe';


@NgModule({
  declarations: [
    SafePipe,
    SortPipe,
    ServerUrlPipe,
  ],
  imports: [],
  exports: [
    SafePipe,
    SortPipe,
    ServerUrlPipe,
  ]
})
export class PipesModule {
}
