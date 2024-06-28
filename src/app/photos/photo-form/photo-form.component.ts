import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { finalize } from "rxjs/operators";

import { PhotoService } from "../photo/photo.service";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { UserService } from "src/app/core/user/user.service";

@Component({
  selector: "ap-photo-form",
  templateUrl: "./photo-form.component.html",
  styleUrls: ["./photo-form.component.scss"],
})
export class PhotoFormComponent implements OnInit {
  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ["", Validators.required],
      description: ["", Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload() {
    const description = this.photoForm.get("description").value;
    const allowComments = this.photoForm.get("allowComments").value;

    this.photoService
      .upload(description, allowComments, this.file)
      .pipe(
        // No final, redireciona para a página do usuário independente se der certo ou não
        finalize(() => {
          this.router.navigate(["/user", this.userService.getUserName()]);
        })
      )
      .subscribe(
        (event: HttpEvent<any>) => {
          // Se ainda está fazendo o upload
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round((100 * event.loaded) / event.total);
          }
          // Se o upload foi concluído
          else if (event instanceof HttpResponse) {
            this.alertService.success("Upload completed successfully!", true);
          }
        },
        (err) => {
          console.log(err);
          this.alertService.danger("Upload error", true);
        }
      );
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
