import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-finish-form',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, NgIf],
  templateUrl: './finish-form.component.html',
  styleUrls: ['./finish-form.component.scss']
})
export class FinishFormComponent implements OnInit {

  /** Variables globales */
  ionicForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  @Output() emitForm = new EventEmitter<string>();
  errorMessage = 'El campo HE LEÍDO EL CONTRATO es obligatorio.';
  isModalOpen = false;
  isToastOpen = false;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.ionicForm = this.formBuilder.group({
      readContract: [null, [Validators.required]],
    });
  }

  activateModal() {
    if (this.ionicForm.valid) {
      this.setModalOpen(true);
    } else {
      this.setToastOpen(true);
      console.log('Please provide all the required values!');
    }
  }

  submitForm() {
    if (this.ionicForm.valid) {
      this.emitForm.emit(this.ionicForm.value);
    } else {
      console.log('Please provide all the required values!');
    }
  };

  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
