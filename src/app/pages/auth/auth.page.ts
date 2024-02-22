import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  standalone: true,
  imports: [RouterModule, IonicModule, CommonModule, FormsModule],
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  /** Variables globales */
  description = 'La alcancía que siempre te acompaña';

  constructor() { }

  ngOnInit() { }

}
