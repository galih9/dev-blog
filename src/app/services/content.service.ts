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

interface IArticle {
  title: string;
  content: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private db: Firestore = inject(Firestore);

  getArticle(): Observable<IArticle[]> {
    return collectionData(collection(this.db, 'articles'), {
      idField: 'id',
    }).pipe(
      map((response: any) => {
        return response.map((doc: any) => ({
          title: doc['title'],
          content: doc['content'],
          id: doc['id'], // Ensure this line is present
        }));
      })
    );
  }

  addArticle(title: string, content: string) {
    const article = { title, content };
    const articlesCollection = collection(this.db, 'articles');
    return addDoc(articlesCollection, article);
  }

  deleteArticle(articleId: string) {
    const articleDocRef = doc(this.db, 'articles', articleId);
    return deleteDoc(articleDocRef);
  }
}
