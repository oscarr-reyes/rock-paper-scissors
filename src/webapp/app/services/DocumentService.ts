import {
	ApplicationRef,
	ComponentFactoryResolver,
	ComponentRef,
	EmbeddedViewRef,
	Injectable,
	Injector
} from "@angular/core";

@Injectable()
export class DocumentService {
	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private appRef: ApplicationRef,
		private injector: Injector
	) {
	}

	/**
	 * Creates a component reference from a component
	 * @param  {any}               component The component where the reference will create
	 * @return {ComponentRef<any>}           The reference of the provided component
	 */
	createComponentRef(component: any): ComponentRef<any> {
		const componentRef = this.componentFactoryResolver
			.resolveComponentFactory(component)
			.create(this.injector);

		this.appRef.attachView(componentRef.hostView);

		return componentRef;
	}

	/**
	 * Gets the HTML element from a component reference
	 * @param  {ComponentRef<any>} componentRef The component reference
	 * @return {HTMLElement}                    The HTML Element from the component
	 */
	getDomElementFromComponentRef(componentRef: ComponentRef<any>): HTMLElement {
		return (componentRef.hostView as EmbeddedViewRef<any>)
			.rootNodes[0] as HTMLElement;
	}

	/**
	 * Gets the HTML element contained inside the document
	 * @param  {string}      id The id of the element
	 * @return {HTMLElement}    The HTML Element inside the document
	 */
	getDomElement(id: string): HTMLElement {
		return document.getElementById(id);
	}

	/**
	 * Appends an HTML Element into another HTML Element
	 * @param {HTMLElement} child  The child HTML Element
	 * @param {HTMLElement} parent The parent HTML Element
	 */
	addChild(child: HTMLElement, parent: HTMLElement = document.body) {
		parent.appendChild(child);
	}

	/**
	 * Destroys a component reference with its HTML Element in the DOM
	 * @param {ComponentRef<any>} componentRef The component reference
	 * @param {number} delay                   The ms to delay for destroying the component
	 */
	destroyRef(componentRef: ComponentRef<any>, delay: number = 0) {
		setTimeout(() => {
			this.appRef.detachView(componentRef.hostView);
			componentRef.destroy();
		}, delay);
	}
}
