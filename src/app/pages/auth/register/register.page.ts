import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FirstFormComponent } from './components/first-form/first-form.component';
import { SecondFormComponent } from './components/second-form/second-form.component';
import { FinishFormComponent } from './components/finish-form/finish-form.component';
import { ListForms } from '@core/interceptors/listForms';

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
  infoForms!: ListForms;
  @ViewChild('stepper1') stepper!: ElementRef;
  currentStep = 1;

  listForm = [
    {
      id: 1,
      header: 'Número celular',
      title: null,
      description: 'Para comenzar, por favor ingresa tu número celular.',
      class: 'editing',
      image: 'assets/img/coink-no-text.svg'
    },
    {
      id: 2,
      header: 'Datos de cuenta',
      title: '¿Cuáles son tus datos?',
      description: 'Ahora necesitamos saber algunos datos tuyos',
      class: null,
      image: 'assets/img/Oink-M.svg'
    },
    {
      id: 3,
      header: 'Finalizar',
      title: 'ESTAS MUY CERCA DE SER PARTE DE COINK.',
      description: 'Solo es necesario que leas detenidamente el contrato que se encuentra al final de esta pantalla y lo aceptes.',
      class: null,
      image: 'assets/img/OinkPolicia.svg'
    }
  ];

  ngOnInit() {
    this.infoForms = this.listForm[0];
  }

  nextStep() {
    this.currentStep++;

    if (this.currentStep > this.stepper.nativeElement.children.length) {
      this.currentStep = 1;
    }

    Array.from(this.stepper.nativeElement.children).forEach((step, index) => {
      let stepNum = index + 1;
      if (stepNum === this.currentStep) {
        this.addClass(step, 'editing');
        this.addNewInfo(this.currentStep);
      } else {
        this.removeClass(step, 'editing');
      }
    })
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

  addNewInfo(item: number) {
    this.infoForms = this.listForm.filter(element => element.id === item)[0];
  }

  hasClass(elem: any, className: string) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
  }

  eventForm(evt: any) {
    this.nextStep();
    console.log('Here', evt);
  }

}
