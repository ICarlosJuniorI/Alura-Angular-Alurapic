import { NgModule } from "@angular/core";
import { PhotoListComponent } from "./photo-list.component";
import { PhotosComponent } from "./photos/photos.component";
import { LoadButtonComponent } from "./load-button/load-button.component";
import { FilterByDescription } from "./filter-by-description.pipe";
import { CommonModule } from "@angular/common";
import { PhotoModule } from "../photo/photo.module";
import { CardModule } from "src/app/shared/components/card/card.module";
import { SearchComponent } from "./search/search.component";
import { DarkenOnHoverModule } from "src/app/shared/directives/darken-on-hover/darken-on-hover.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotosComponent,
    LoadButtonComponent,
    FilterByDescription,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    PhotoModule,
    CardModule,
    DarkenOnHoverModule,
    RouterModule,
  ],
})
export class PhotoListModule {}
