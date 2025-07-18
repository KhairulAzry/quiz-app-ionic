import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonInput, IonText, IonSelect, IonSelectOption, IonLabel, IonDatetimeButton, IonModal, IonDatetime, } from '@ionic/angular/standalone';

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
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonText,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonDatetime,
    IonDatetimeButton,
    IonModal
  ],
})
export class HomePage {

  form = signal<FormGroup | null>(null);
  categories = signal<any[]>([]);

  private formBuilder = inject(FormBuilder);

  constructor() {
    this.initForm();
  }

  initForm() {
    const form = this.formBuilder.group({
      question_count: [null, [Validators.required, Validators.minLength(1)]],
      category_id: [null, [Validators.required]],
      duration: [null, [Validators.required]],
    });

    this.form.set(form);
  }
}
