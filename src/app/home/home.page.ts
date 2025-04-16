import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

// Importación de los componentes de Ionic
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contacts: any[] = [];  // Array para almacenar los contactos

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      data => {
        this.contacts = data;  // Asignamos los datos de los contactos al array
      },
      error => {
        console.error('Error al cargar los contactos', error);  // Manejo de errores
      }
    );
  }
}

