import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../services/player.service";

@Component({
  selector: "app-winner-page",
  templateUrl: "./winner-page.component.html",
  styleUrls: ["./winner-page.component.css"],
})
export class WinnerPageComponent implements OnInit {
  winner: any;
  players: any;

  constructor(private _playerService: PlayerService) {
    this.get_localstorage();
  }
  ngOnInit() {
    this._playerService.getPlayers().subscribe(
      (data) => {
        this.players = data;
      },
      (error) => {
        console.log(error);
      },
    );
  }
  get_localstorage() {
    this.winner = JSON.parse(localStorage.getItem("winner")!);
  }
}
