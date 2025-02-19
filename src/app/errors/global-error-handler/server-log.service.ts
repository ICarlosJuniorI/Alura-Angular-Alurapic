import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ServerLog } from "./server-log";
import { environment } from "src/environments/environment";

const API: string = environment.serverLog;

@Injectable({ providedIn: "root" })
export class ServerLogService {
  constructor(private http: HttpClient) {}

  log(serverLog: ServerLog) {
    return this.http.post(`${API}/infra/log`, serverLog);
  }
}
