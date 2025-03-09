import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore); // Use correct injection
  private router: Router = inject(Router);

  async googleSignIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(this.auth, provider);
      const user = result.user;

      if (user) {
        await this.checkAndAddUserToFirestore(user);
        await this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Google Sign-in Error:', error);
      throw error;
    }
  }

  private async checkAndAddUserToFirestore(user: any): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', user.uid); // Create a document reference

    const docSnapshot = await getDoc(userDocRef);

    if (!docSnapshot.exists()) {
      // User is signing in for the first time
      await setDoc(userDocRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: dayjs().format('DD/MM/YYYY, HH:mm:ss'),
        lastLogin: dayjs().format('DD/MM/YYYY, HH:mm:ss'),
      });
    } else {
      await updateDoc(userDocRef, {
        lastLogin: dayjs().format('DD/MM/YYYY, HH:mm:ss'),
      });
    }
  }

  async logout() {
    await this.auth.signOut();
  }

  get user$(): Observable<User | null> {
    return new Observable((observer) => {
      return this.auth.onAuthStateChanged(observer);
    });
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
