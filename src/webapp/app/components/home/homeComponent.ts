import { Component, EventEmitter } from "@angular/core";
import Match from "../../classes/Match";

@Component({
	selector: "app-home",
	templateUrl: "./homeComponent.html",
	styleUrls: ["./homeComponent.scss"]
})
export class HomeComponent {
	newMatch: EventEmitter<Match>;

	constructor() {
		this.newMatch = new EventEmitter<Match>();
	}

	newMatchHandler(match: Match) {
		this.newMatch.next(match);
	}
}
