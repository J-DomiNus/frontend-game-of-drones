import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PlayerService } from "../services/player.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-round",
  templateUrl: "./round.component.html",
  styleUrls: ["./round.component.css"],
})
export class RoundComponent {
  player1: any;
  player2: any;
  playerTurn: any;
  turnId: number = 1;
  form: FormGroup;
  roundsCounter: number = 1;
  moves: any = ["Rock", "Sissors", "Paper"];
  nemesis: any = {
    Rock: "Paper",
    Sissors: "Rock",
    Paper: "Sissors",
  };
  message: string = "";
  score: any = {
    player1: 0,
    player2: 0,
  };
  rounds: any = [];

  constructor(
    private fb: FormBuilder,
    private _playerService: PlayerService,
    private router: Router,
  ) {
    this.get_localstorage();
    this.set_Turn(this.player1);
    this.form = this.fb.group({
      move: ["", [Validators.required]],
    });
  }
  save_localstorage(winner: any) {
    localStorage.setItem("player1", JSON.stringify(this.player1));
    localStorage.setItem("player2", JSON.stringify(this.player2));
    localStorage.setItem("winner", JSON.stringify(winner));
  }
  get_localstorage() {
    this.player1 = JSON.parse(localStorage.getItem("player1")!);
    this.player2 = JSON.parse(localStorage.getItem("player2")!);
  }
  set_Turn(player: any) {
    this.playerTurn = player;
  }

  submitTurn() {
    if (this.turnId === 1) {
      this.player1.move = this.form.get("move")?.value;
      this.playerTurn = this.player2;
      this.turnId = 2;
      this.form.reset();
    } else {
      this.player2.move = this.form.get("move")?.value;
      this.playerTurn = this.player1;
      this.turnId = 1;
      this.form.reset();
      this.getRoundWinner();
    }
  }
  getRoundWinner() {
    let winner: string;
    if (this.player1.move === this.nemesis[this.player2.move]) {
      this.score.player1 += 1;
      winner = this.player1.name;
    } else if (this.player2.move === this.nemesis[this.player1.move]) {
      this.score.player2 += 1;
      winner = this.player2.name;
    } else {
      return (this.message = `That's a Draw!`);
    }
    this.message = ``;
    this.rounds.push({ round: this.roundsCounter, winner: winner });
    if (this.score.player1 === 3) {
      this.setGameWinner(this.player1);
    } else if (this.score.player2 === 3) {
      this.setGameWinner(this.player2);
    }
    return (this.roundsCounter += 1);
  }
  setGameWinner(player: any) {
    player.wins += 1;
    this._playerService.updatePlayer(player.id, player).subscribe(
      (data) => {
        this.save_localstorage(data);
        this.router.navigateByUrl("/winner");
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
