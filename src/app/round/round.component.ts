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
  turnId = 1;
  form: FormGroup;
  roundsCounter = 1;
  moves = ["Rock", "Sissors", "Paper"];
  nemesis: any = {
    Rock: "Paper",
    Sissors: "Rock",
    Paper: "Sissors",
  };

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
    // console.log("hola que tal?");
    // console.log(this.player1);
    // console.log(this.player2);
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
    if (this.player1.move === this.player2.move) {
      // restart round 1
      console.log("Draw");
    } else if (this.player1.move === this.nemesis[this.player2.move]) {
      console.log("Player 1 Wins");
    } else {
      console.log("Player 2 Wins");
      //player2
    }
    console.log(this.player1);
    console.log(this.player2);
  }
}
