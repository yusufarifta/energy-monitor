// import {Injectable} from "@angular/core";
// import {BsModalService} from "ngx-bootstrap/modal";
//
// @Injectable({providedIn: "root"})
// export class AlertService {
//   constructor(
//     private bsModalService: BsModalService
//   ) {
//   }
//   confirm(message): Promise<boolean> {
//     const modal = this.bsModalService.show(
//       EsConfirmModalComponent,
//       {
//         //id:111,
//         initialState: { title: 'Confirm', message: message, type: 'confirm', color: 'green'}
//       }
//     );
//
//     return new Promise<boolean>((resolve, reject) => modal.content.result.subscribe((result) => resolve(result)));
//   }
//
//   success(message): Promise<boolean> {
//     const modal = this.bsModalService.show(
//       EsConfirmModalComponent,
//       {//id:111,
//         initialState: { title: 'Success', message: message, type: 'alert', color: 'green' }
//       }
//     );
//
//     return new Promise<boolean>((resolve, reject) => modal.content.result.subscribe((result) => resolve(result)));
//   }
//
//   error(message): Promise<boolean> {
//     const modal = this.bsModalService.show(
//       EsConfirmModalComponent,
//       {
//         //id:111,
//         initialState: { title: 'Error', message: message, type: 'alert', color: 'red' }
//       }
//     );
//
//     return new Promise<boolean>((resolve, reject) => modal.content.result.subscribe((result) => resolve(result)));
//   }
//
//   audit(pesan, judul): Promise<boolean> {
//     const modal = this.bsModalService.show(
//       EsConfirmModalComponent,
//       {
//         //id:111,
//         initialState: { title: judul, message: pesan, type: 'alert', color: 'green'},
//         class: 'modal-holder',
//         backdrop:"static",
//         //ignoreBackdropClick: true
//       }
//     );
//
//     return new Promise<boolean>((resolve, reject) => modal.content.result.subscribe((result) => resolve(result)));
//   }
//
//   payment(message): Promise<boolean> {
//     const modal = this.bsModalService.show(
//       EsConfirmModalComponent,
//       {
//         //id:111,
//         initialState: { title: 'Confirm', message: message, type: 'confirm',color: 'white'}
//       }
//     );
//
//     return new Promise<boolean>((resolve, reject) => modal.content.result.subscribe((result) => resolve(result)));
//   }
// }
