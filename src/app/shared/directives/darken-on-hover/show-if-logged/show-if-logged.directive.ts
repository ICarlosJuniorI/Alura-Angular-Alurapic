import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";

@Directive({
  selector: "[showIfLogged]",
})
export class ShowIfLoggedDirective implements OnInit {
  currentDisplay: string;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Pega o estilo atual do display
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;

    /*
      Verifica se o usuário está logado.
      Se estiver logado, mantém o display como estava,
      se não, esconde o elemento com display: none.
    */
    this.userService.getUser().subscribe((user) => {
      if (user) {
        this.renderer.setStyle(
          this.element.nativeElement,
          "display",
          this.currentDisplay
        );
      } else {
        this.currentDisplay = getComputedStyle(
          this.element.nativeElement
        ).display;
        this.renderer.setStyle(this.element.nativeElement, "display", "none");
      }
    });
  }
}
