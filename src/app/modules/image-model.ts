import {SafeUrl} from "@angular/platform-browser";

export class ImageModel {
  file: File | undefined;
  url: SafeUrl | undefined;

  id:number|undefined;
  picBytes: ArrayBuffer | undefined
}
