import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router, // Dá acesso aos eventos de navegação e rotas
    private activatedRoute: ActivatedRoute, // Dá acesso a rota que está sendo usada no momento
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // Se inscreve nos eventos de rotas
    this.router.events
      // Filtra somente os eventos NavigationEnd
      .pipe(filter((event) => event instanceof NavigationEnd))
      // Pega a rota atual
      .pipe(map(() => this.activatedRoute))
      .pipe(
        // Faz um map para pegar a rota ativada no momento
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )
      // Seleciona os dados da rota ativada
      .pipe(switchMap((route) => route.data))
      // Atualiza o título do documento com o título da rota
      .subscribe((event) => this.titleService.setTitle(event.title));
  }
}
