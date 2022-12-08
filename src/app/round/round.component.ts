import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  constructor(private fb: FormBuilder) {
    this.get_localstorage();
    this.set_Turn(this.player1);
    this.form = this.fb.group({
      move: ["", [Validators.required]],
    });
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
    if (this.player1.move === this.player2.move) {
      return (this.message = `That's a Draw!`);
    } else if (this.player1.move === this.nemesis[this.player2.move]) {
      this.score.player1 += 1;
      winner = this.player1.name;
    } else {
      this.score.player2 += 1;
      winner = this.player2.name;
    }
    this.message = ``;
    this.rounds.push({ round: this.roundsCounter, winner: winner });
    if (this.score.player1 === 3 || this.score.player2 === 3) {
      console.log("We have a winner!");
    }
    return (this.roundsCounter += 1);
  }
}
