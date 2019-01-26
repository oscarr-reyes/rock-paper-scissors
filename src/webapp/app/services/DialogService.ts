import {Component, ComponentRef, Injectable} from "@angular/core";
import {DocumentService} from "./DocumentService";
import {DialogContainerComponent} from "./_components/dialog/dialogContainerComponent";
import {DialogComponent} from "./_components/dialog/dialogComponent";

@Injectable()
export class DialogService {
	private containerRef: ComponentRef<DialogContainerComponent>;
	private containerElement: HTMLElement;
	private componentRef: ComponentRef<Component>;

	constructor(private documentService: DocumentService) {
		this.containerRef = this.documentService.createComponentRef(DialogContainerComponent);
		this.containerElement = this.documentService.getDomElementFromComponentRef(this.containerRef);
		this.documentService.addChild(this.containerElement);
	}

	show(title: string, subtitle: string = null): Promise<void> {
		this.createDialog(DialogComponent);

		const instance = <DialogComponent>this.componentRef.instance;

		instance.title = title;
		instance.subtitle = subtitle;

		const element = this.documentService.getDomElementFromComponentRef(this.componentRef);

		element.classList.add("card");

		this.documentService.addChild(element, this.containerElement);

		this.display();

		return instance.buttonClick.then(() => this.close());
	}

	close(): void {
		this.containerElement.classList.remove("flexed-row");

		this.documentService.destroyRef(this.componentRef, 0);

		this.componentRef = null;
	}

	private display(): void {
		this.containerElement.classList.add("flexed-row");
	}

	private createDialog(component): void {
		this.componentRef = this.documentService.createComponentRef(component);
	}
}