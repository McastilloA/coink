import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FirstFormComponent } from './components/first-form/first-form.component';
import { SecondFormComponent } from './components/second-form/second-form.component';
import { FinishFormComponent } from './components/finish-form/finish-form.component';
import { ListForms } from '@core/interfaces/listForms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    RouterModule, IonicModule, CommonModule, FormsModule,
    FirstFormComponent, SecondFormComponent, FinishFormComponent
  ],
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  /** Variables globales */
  listForm = [
    {
      id: 1,
      header: 'Número celular',
      title: null,
      description: 'Para comenzar, por favor ingresa tu número celular.',
      class: 'editing',
      image: 'assets/img/Oink-M.svg',
      stateStepper: true
    },
    {
      id: 2,
      header: 'Datos de cuenta',
      title: '¿Cuáles son tus datos?',
      description: 'Ahora necesitamos saber algunos datos tuyos',
      class: null,
      image: 'assets/img/Oink-M.svg',
      stateStepper: false
    },
    {
      id: 3,
      header: 'Finalizar',
      title: 'ESTAS MUY CERCA DE SER PARTE DE COINK.',
      description: 'Solo es necesario que leas detenidamente el contrato que se encuentra al final de esta pantalla y lo aceptes.',
      class: null,
      image: 'assets/img/OinkPolicia.svg',
      stateStepper: false
    }
  ];
  infoForms!: ListForms;
  formBuilder = inject(FormBuilder);
  @ViewChild('stepper') stepper!: ElementRef;
  ionicForm!: FormGroup;

  ngOnInit(): void {
    this.infoForms = this.listForm.filter(resp => resp.stateStepper)[0];
    this.initForm();
    setTimeout(() => {
      this.nextStep(this.infoForms.id);
    }, 0);
  }

  initForm() {
    this.ionicForm = this.formBuilder.group({
      mobile: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      typeDocument: [null, [Validators.required]],
      document: [null, [Validators.required]],
      dateIssue: [null, [Validators.required]],
      dateBirth: [null, [Validators.required]],
      genre: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      confirmEmail: [null, [Validators.required]],
      pin: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      confirmPin: [null, [Validators.required]],
      readContract: [null, [Validators.required]]
    });
  }

  nextStep(idStepper: number) {
    const totalSteps = this.stepper.nativeElement.children;
    idStepper = (idStepper > totalSteps.length) ? 1 : idStepper;

    Array.from(totalSteps).forEach((step, index) => {
      let stepNum = index + 1;
      const isCurrentStep = stepNum === idStepper;
      this.toggleClass(step, 'editing', isCurrentStep);

      if (isCurrentStep) {
        this.addInformation(idStepper);
      }
    })
  }

  addInformation(item: number) {
    this.infoForms = this.listForm.filter(element => element.id === item)[0];
  }

  toggleClass(element: any, className: string, condition: boolean) {
    if (condition) {
      this.addClass(element, className);
    } else {
      this.removeClass(element, className);
    }
  }

  addClass(elem: any, className: string) {
    if (!this.hasClass(elem, className)) {
      elem.className += ' ' + className;
    }
  }

  removeClass(elem: any, className: string) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (this.hasClass(elem, className)) {
      while (newClass.indexOf(' ' + className + ' ') >= 0) {
        newClass = newClass.replace(' ' + className + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  }

  hasClass(elem: any, className: string) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
  }

  onChangeForm(objectForm: any) {
    this.ionicForm.patchValue(objectForm)
    this.nextStep(this.infoForms.id + 1);
    console.log('Objecto solicitado en la prueba!', this.ionicForm.value);
  }

}
