import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  private myAppUrl = "https://localhost:7014/";
  private myApiUrl = "api/player/";

  constructor(private http: HttpClient) {}
  getPlayers(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  savePlayer(name: string, player: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl + name, player);
  }
  updatePlayer(id: number, player: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, player);
  }
}
