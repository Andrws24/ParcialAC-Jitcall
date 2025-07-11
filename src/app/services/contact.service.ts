import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async getContacts(): Promise<Observable<any[]>> {
    const user = await this.authService.getCurrentUser();
  
    if (!user) {
      return new Observable<any[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  
    const contactsRef = collection(this.firestore, `users/${user.uid}/contacts`);
    return collectionData(contactsRef, { idField: 'id' });
  }

  async contactExistsByPhone(phone: string): Promise<any | null> {
    const usersRef = collection(this.firestore, 'users');
    const snapshot = await getDoc(doc(this.firestore, `users/${phone}`));
    return snapshot.exists() ? snapshot.data() : null;
  }
}