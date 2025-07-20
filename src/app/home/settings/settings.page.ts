import { Component, OnInit } from '@angular/core';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent, 
    IonHeader,
    IonItem,
    IonLabel,
    IonList, 
    IonTitle, 
    IonToolbar, 
  ]
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
