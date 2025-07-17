import { Component, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonCard, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent,
    ReactiveFormsModule
  ],
})
export class HomePage {

  form = signal<FormGroup | null>(null);
  constructor() {}
}
