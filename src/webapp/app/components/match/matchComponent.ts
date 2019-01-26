import { Component, Output } from "@angular/core";
import Players from "../../classes/Players";
import Score from "../../classes/Score";
import { EventEmitter } from "@angular/core";
import Match from "../../classes/Match";
import { MatchService } from "../../services/MatchService";
import { DialogService } from "../../services/DialogService";
import { ToastService } from "../../services/ToastService";

@Component({
	selector: "app-match",
	templateUrl: "./matchComponent.html",
	styleUrls: ["./matchComponent.scss"]
})
export class MatchComponent {
	players: Players;
	formDisplay: string;
	currentPlayer: string;
	score: Score[];
	round: { player1: string, player2: string };

	@Output() winner: EventEmitter<Match>;

	constructor(
		private matchService: MatchService,
		private dialogService: DialogService,
		private toastService: ToastService
	) {
		this.score = [];
		this.currentPlayer = "player1";
		this.formDisplay = "setup";
		this.players = {
			player1: "",
			player2: ""
		};
		this.round = {
			player1: null,
			player2: null
		};
		this.winner = new EventEmitter<any>();
	}

	setupHandler() {
		const players = this.players;
		const valid = players.player1.trim() !== "" && players.player2.trim() !== "";

		if (!valid) {
			this.dialogService.show("Player names must be set");
		} else {
			this.formDisplay = "play";
		}
	}

	playHandler() {
		const isValid = this.round[this.currentPlayer] !== null;
		const isFirstPlayer = this.currentPlayer === "player1";

		if (isValid) {
			if (isFirstPlayer) {
				this.currentPlayer = "player2";
			} else {
				this.setRoundWin();
				this.resetRoundForm();
			}
		}
	}

	setRoundWin() {
		const roundWin = this.resolveWin(this.round.player1, this.round.player2);
		const playerProp = `player${roundWin}`;
		const subitleText = `${this.players[playerProp]} Wins!`;

		this.score.push({
			player: playerProp,
			hand: this.round[playerProp]
		});

		if (this.score.length == 3) {
			this.getMatchWinner();

			this.dialogService.show("We have a WINNER!!", subitleText)
				.then(() => {
					this.resetRoundForm();
					this.resetMatch();
				});
		}
	}

	getMatchWinner() {
		let player1Score = 0;

		this.score.forEach(score => {
			if (score.player == "player1") {
				player1Score++;
			}
		});

		const winner = player1Score > 2 ? "player1" : "player2";
		const match = this.createMatchInstance(winner);

		this.matchService.createMatch(match)
			.subscribe((data: Match) => {
				this.winner.next(data);
				this.toastService.display("Match successfully stored");
			}, error => {
				console.log("error", error);
			});
	}

	createMatchInstance(winner: string): Match {
		const match = new Match();

		match.player1 = this.players.player1;
		match.player2 = this.players.player2;
		match.winner = winner;
		match.rounds = this.score.map(score => {
			return {
				winner: score.player,
				hand: score.hand
			};
		});

		return match;
	}

	resetRoundForm() {
		this.currentPlayer = "player1";

		this.round.player1 = null;
		this.round.player2 = null;
	}

	resetMatch() {
		this.players.player1 = null;
		this.players.player2 = null;
		this.formDisplay = "setup";

		this.score = [];
	}

	resolveWin(first: string, second: string) {
		if (first === "rock" && second === "scissors") {
			return 1;
		} else if (first === "paper" && second === "rock") {
			return 1;
		} else if (first === "scissors" && second === "paper") {
			return 1;
		} else {
			return 2;
		}
	}
}
