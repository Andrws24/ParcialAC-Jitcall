import { Component } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
  standalone: false,
})
export class AddContactPage {
  phoneNumber: string = '';

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private toastController: ToastController
  ) {}

  async addContact() {
    // 1. Obtener el usuario autenticado
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.showToast('❌ No se encontró un usuario autenticado');
      return;
    }

    // 2. Validar que se haya ingresado un número
    if (!this.phoneNumber || this.phoneNumber.trim() === '') {
      this.showToast('⚠️ Ingresa un número válido');
      return;
    }

    const phone = this.phoneNumber.trim();
    const contactRef = doc(this.firestore, `users/${user.uid}/contacts/${phone}`);

    try {
      // 3. Verificar si ya existe
      const contactSnap = await getDoc(contactRef);
      if (contactSnap.exists()) {
        this.showToast('⚠️ Este número ya está registrado');
        return;
      }

      // 4. Crear el contacto si no existe
      const contactData = { phoneNumber: phone };
      await setDoc(contactRef, contactData);

      this.showToast('✅ Contacto agregado exitosamente');
      this.phoneNumber = '';
    } catch (error) {
      console.error('Error al agregar el contacto:', error);
      this.showToast('❌ Ocurrió un error al agregar el contacto');
    }
  }

  // Método para mostrar mensajes en pantalla
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'primary'
    });
    await toast.present();
  }
}
