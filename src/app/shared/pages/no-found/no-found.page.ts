import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-no-found',
  templateUrl: './no-found.page.html',
  styleUrls: ['./no-found.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NoFoundPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
