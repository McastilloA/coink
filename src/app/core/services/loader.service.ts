import { LoadingController } from '@ionic/angular';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /** Variables globales */
  #loadingCtrl = inject(LoadingController);

  showLoader() {
    this.#loadingCtrl.create({
      message: 'Cargando...'
    }).then((response) => {
      response.present();
    });
  }

  dismissLoader() {
    this.#loadingCtrl.dismiss().then()
      .catch((err) => {
        console.log('Error occured : ', err);
      });
  }

}
