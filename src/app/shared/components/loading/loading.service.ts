import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoadingType } from "./loading-type";
import { startWith } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class LoadingService {
  loadingSubject: Subject<LoadingType> = new Subject<LoadingType>();

  getLoading() {
    return (
      this.loadingSubject
        .asObservable()
        // Inicia com o estado STOPPED ao iniciar o serviço
        .pipe(startWith(LoadingType.STOPPED))
    );
  }

  start() {
    this.loadingSubject.next(LoadingType.LOADING);
  }

  stop() {
    this.loadingSubject.next(LoadingType.STOPPED);
  }
}
