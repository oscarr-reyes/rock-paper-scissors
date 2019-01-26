import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { MatchService } from "../../services/MatchService";
import Match from "../../classes/Match";

@Component({
	selector: "app-history",
	templateUrl: "./historyComponent.html",
	styleUrls: ["./historyComponent.scss"]
})
export class HistoryComponent implements OnInit {
	matches: Match[];
	loading: boolean;

	@Input() newMatch: EventEmitter<Match>;

	constructor(private matchService: MatchService) {
		this.loading = true;
		this.matches = [];
	}

	ngOnInit(): void {
		this.matchService.getMatches()
			.subscribe(matches => {
				// set this so they could have time to see what is happening in the document
				setTimeout(() => {
					this.matches = matches;
					this.loading = false;
				}, 1000);
			}, error => {
				console.log("error", error);
				this.loading = false;
			});

		if (this.newMatch) {
			this.newMatch.subscribe(match => {
				this.matches.push(match);
			}, error => {
				console.log("error", error);
			});
		}
	}
}
