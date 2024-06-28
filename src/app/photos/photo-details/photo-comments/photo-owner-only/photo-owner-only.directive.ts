import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";
import { Photo } from "src/app/photos/photo/photo";

@Directive({
  selector: "[photoOwnerOnly]",
})
export class PhotoOwnerOnlyDirective implements OnInit {
  @Input() ownedPhoto: Photo;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      // Se ninguem estiver logado ou não é o dono da foto, o elemento é escondido
      if (!user || user.id != this.ownedPhoto.userId) {
        this.renderer.setStyle(this.element.nativeElement, "display", "none");
      }
    });
  }
}
