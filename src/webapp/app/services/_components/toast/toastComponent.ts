import { Component, Input } from "@angular/core";

@Component({
	template: "{{message}}",
	styleUrls: ["./toastComponent.scss"]
})
export class ToastComponent {
	@Input() message: string;

	constructor() {
	}
}
