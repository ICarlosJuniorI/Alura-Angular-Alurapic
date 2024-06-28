import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "ap-search",
  templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onTyping = new EventEmitter<string>();
  @Input() value: string = "";

  filter: string = "";
  debounce: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    // O filtro só é aplicado após 300 milisegundos depois da digitação do usuário
    this.debounce
      .pipe(debounceTime(300))
      .subscribe((filter) => this.onTyping.emit(filter));
  }

  // ngOnDestroy é chamado quando o componente é destruído
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
