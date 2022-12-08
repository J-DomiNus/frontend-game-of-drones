import { Component, Input } from "@angular/core";

@Component({
  selector: "app-scorer",
  templateUrl: "./scorer.component.html",
  styleUrls: ["./scorer.component.css"],
})
export class ScorerComponent {
  player1: any;
  player2: any;
  @Input() rounds: any;
  @Input() score: any;
  constructor() {
    this.get_localstorage();
  }
  get_localstorage() {
    this.player1 = JSON.parse(localStorage.getItem("player1")!);
    this.player2 = JSON.parse(localStorage.getItem("player2")!);
  }
}
