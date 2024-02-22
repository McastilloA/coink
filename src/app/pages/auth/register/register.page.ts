import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    RouterModule, IonicModule, CommonModule, FormsModule
  ],
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  /** Variables globales */
  title = 'Número celular';
  @ViewChild('stepper1') stepper!: ElementRef;
  currentStep = 1;

  ngOnInit() { }

  nextStep() {
    this.currentStep++;

    if (this.currentStep > this.stepper.nativeElement.children.length) {
      this.currentStep = 1;
    }

    Array.from(this.stepper.nativeElement.children).forEach((step, index) => {
      let stepNum = index + 1;
      if (stepNum === this.currentStep) {
        this.addClass(step, 'editing');
        this.addNewTitle(this.currentStep);
      } else {
        this.removeClass(step, 'editing');
      }
    })
  }

  addClass(elem: any, className: string) {
    if (!this.hasClass(elem, className)) {
      elem.className += ' ' + className;
      console.log('Here', elem.className);
    }
  }

  addNewTitle(elem: number) {
    switch (elem) {
      case 2:
        this.title = 'Datos de cuenta'
        break;
      case 3:
        this.title = 'Finalizar'
        break;

      default:
        this.title = 'Número celular'
        break;
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

}
