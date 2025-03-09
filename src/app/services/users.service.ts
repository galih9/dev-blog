import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../types/article';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private db: Firestore = inject(Firestore);

  getUsers(): Observable<IUser[]> {
    return collectionData(collection(this.db, 'users'), {
      idField: 'id',
    }).pipe(
      map((response: any) => {
        return response.map((doc: any) => ({
          uid: doc['uid'],
          createdAt: doc['createdAt'],
          displayName: doc['displayName'],
          email: doc['email'],
          lastLogin: doc['lastLogin'],
          photoUrl: doc['photoUrl'],
        }));
      })
    );
  }
}
