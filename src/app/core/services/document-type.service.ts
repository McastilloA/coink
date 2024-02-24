import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { DocumentTypes } from '@core/interfaces/documenType.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  /** Variabls globales */
  #url = environment;
  #http = inject(HttpClient);

  getDocumentType(): Observable<DocumentTypes[]> {
    return this.#http.get<DocumentTypes[]>(`${this.#url.baseUrl}/${this.#url.controller}?apiKey=030106`);
  }

}
