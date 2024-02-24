import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subject, filter, takeUntil } from 'rxjs';

import { DocumentTypes } from '@core/interfaces/documenType.interface';
import { DocumentTypeService } from '@core/services/document-type.service';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-second-form',
  standalone: true,
  imports: [IonicModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.scss']
})
export class SecondFormComponent implements OnInit {

  /** Variables globales */
  ionicForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  #unSubscribe$ = new Subject<void>();
  @Output() emitForm = new EventEmitter<string>();
  errorMessage = 'Este campo es obligatorio.';
  #documentTypeService = inject(DocumentTypeService);
  #loaderService = inject(LoaderService);
  stateDocumuentType = signal<DocumentTypes[]>([]);

  password: string = '';
  showPassword: boolean = false;

  ngOnInit() {
    this.initForm();
    this.listDocumentType();
  }

  initForm() {
    this.ionicForm = this.formBuilder.group({
      typeDocument: ['', Validators.required],
      document: ['', Validators.required],
      dateIssue: ['', Validators.required],
      dateBirth: ['', Validators.required],
      genre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', { validators: Validators.required, updateOn: 'submit' }],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      confirmPin: ['', Validators.required],
    }, { validator: this.emailMatchValidator });
  }

  emailMatchValidator(group: FormGroup) {
    const email = group.controls?.['email'].value;
    const confirmEmail = group.controls?.['confirmEmail'].value;
    return email === confirmEmail ? null : { emailMismatch: true };
  }

  listDocumentType(): void {
    this.#loaderService.showLoader();
    this.#documentTypeService.getDocumentType()
      .pipe(takeUntil(this.#unSubscribe$))
      .pipe(filter(res => res.length > 0))
      .subscribe({
        next: (res) => this.successDocumentType(res),
        error: (err) => this.handleError(err)
      })
  }

  successDocumentType(res: DocumentTypes[]) {
    this.stateDocumuentType.set(res);
    this.#loaderService.dismissLoader();
  }

  handleError(err: any) {
    this.#loaderService.dismissLoader();
    console.error('Error in service', err);
  }

  submitForm() {
    if (this.ionicForm.valid) {
      this.emitForm.emit(this.ionicForm.value);
    } else {
      console.log('Please provide all the required values!');
    }
  };

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
