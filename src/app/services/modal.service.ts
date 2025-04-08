import { Injectable, ComponentRef, ApplicationRef, Type, EnvironmentInjector, createComponent, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalRef: ComponentRef<any> | null = null; // Inicia en nulo

  private _injector = inject(EnvironmentInjector);
  private _appRef = inject(ApplicationRef);

  open<T>(component: Type<T>, inputs?: Partial<T>): ComponentRef<T> {
    
    // Si ya hay un modal abierto, no abrir uno nuevo
    if (this.modalRef) {
      //console.log("Ya hay un modal abierto, no se abrirá uno nuevo.");
      return this.modalRef;
    }

    this.modalRef = createComponent(component, {
      environmentInjector: this._injector
    });

    if (inputs) {
      //console.log(inputs);
      Object.assign(this.modalRef.instance, inputs);
    }

    this._appRef.attachView(this.modalRef.hostView);
    const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    document.body.style.overflow = 'hidden';

    return this.modalRef;
  }

  close(): void {
    if (this.modalRef) {
      this._appRef.detachView(this.modalRef.hostView);
      document.body.style.overflow = '';
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }
}
