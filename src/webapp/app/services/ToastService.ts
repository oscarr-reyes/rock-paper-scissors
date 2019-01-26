import { ComponentRef, Injectable } from "@angular/core";
import { DocumentService } from "./DocumentService";
import { ToastContainerComponent } from "./_components/toast/toastContainerComponent";
import { ToastComponent } from "./_components/toast/toastComponent";

@Injectable()
export class ToastService {
	private lifetime = 3000;
	private containerRef: ComponentRef<ToastContainerComponent>;
	private containerElement: HTMLElement;

	constructor(private documentService: DocumentService) {
		this.containerRef = this.documentService.createComponentRef(ToastContainerComponent);
		this.containerElement = this.documentService.getDomElementFromComponentRef(this.containerRef);

		this.documentService.addChild(this.containerElement);
	}

	/**
	 * Displays a toast with a message
	 *
	 * @param {string} message The message to display in the toast
	 */
	display(message: string): void {
		const ref = this.documentService.createComponentRef(ToastComponent);
		const instance = <ToastComponent> ref.instance;
		const element = this.documentService.getDomElementFromComponentRef(ref);

		instance.message = message;

		this.documentService.addChild(element, this.containerElement);
		this.documentService.destroyRef(ref, this.lifetime);
	}
}
