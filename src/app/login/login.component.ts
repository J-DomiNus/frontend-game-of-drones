import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PlayerService } from "../services/player.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  form: FormGroup;
  playersSaved: number = 0;

  constructor(
    private fb: FormBuilder,
    private _playerService: PlayerService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      player1: ["", [Validators.required]],
      player2: ["", [Validators.required]],
    });
  }
  save_localstorage(player: any, n: number) {
    const key = "player" + (n + 1);
    localStorage.setItem(key, JSON.stringify(player));
    this.playersSaved += 1;
    this.navigate_Rounds();
  }
  navigate_Rounds() {
    if (this.playersSaved === 2) {
      this.router.navigateByUrl("/rounds");
    }
    return;
  }
  startGame() {
    const players: any[] = [];
    const player1: any = {
      name: this.form.get("player1")?.value.toLowerCase(),
    };
    const player2: any = {
      name: this.form.get("player2")?.value.toLowerCase(),
    };
    players.push(player1, player2);

    for (let i = 0; i <= 1; i++) {
      this._playerService.savePlayer(players[i].name, players[i]).subscribe(
        (data) => {
          console.log("----------");
          console.log(data);
          players[i] = data;
          this.save_localstorage(players[i], i);
          console.log(players[i]);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }
}
