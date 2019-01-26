import { Component } from "@angular/core";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialogComponent.html",
	styleUrls: ["./dialogComponent.scss"]
})
export class DialogComponent {
	title: string;
	subtitle: string;
	buttonClick: Promise<void>;

	private resolve;

	constructor() {
		this.buttonClick = new Promise(resolve => {
			this.resolve = resolve;
		});
	}

	buttonHandler() {
		this.resolve();
	}
}
