import { Component, Input } from "@angular/core";

const CLOUD = "http://localhost:3000/imgs/";

@Component({
  selector: "ap-photo",
  templateUrl: "./photo.component.html",
  // styleUrls: ["./photo.component.scss"]
})
export class PhotoComponent {
  private _url = "";

  // @Input() permite que o componente receba valores externos como props
  @Input() description = "";

  @Input() set url(url: string) {
    if (!url.startsWith("data")) {
      this._url = CLOUD + url;
    } else {
      this._url = url;
    }
  }

  get url() {
    return this._url;
  }
}
