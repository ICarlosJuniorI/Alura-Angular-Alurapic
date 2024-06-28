import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

import { PhotoComment } from "../../photo/photo-comment";
import { PhotoService } from "../../photo/photo.service";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "ap-photo-comments",
  templateUrl: "./photo-comments.component.html",
  styleUrls: ["./photo-comments.component.scss"],
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId: number;

  commentForm: FormGroup;
  comments$: Observable<PhotoComment[]>;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ["", Validators.maxLength(300)],
    });
  }

  save() {
    const comment: string = this.commentForm.get("comment").value;
    this.comments$ = this.photoService
      .addComment(this.photoId, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(
        tap(() => {
          this.commentForm.reset();
          alert("Comentário adicionado com sucesso!");
        })
      );
  }
}
