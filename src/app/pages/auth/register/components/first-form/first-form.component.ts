import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-first-form',
  standalone: true,
  imports: [IonicModule, NgIf, ReactiveFormsModule],
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.scss'],
})
export class FirstFormComponent implements OnInit {

  /** Variables globales */
  ionicForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  @Output() emitForm = new EventEmitter<string>();

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.ionicForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  submitForm = () => {
    if (this.ionicForm.valid) {
      this.emitForm.emit(this.ionicForm.value);
    } else {
      return console.log('Please provide all the required values!');
    }
  };

}
