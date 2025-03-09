import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  docData,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IArticle } from '../types/article';

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
          uid: doc['uid'],
          displayName: doc['displayName'],
          id: doc['id'], // Ensure this line is present
        }));
      })
    );
  }

  getArticleById(articleId: string): Observable<IArticle | undefined> {
    const articleDocumentReference = doc(this.db, 'articles', articleId);

    return docData(articleDocumentReference, { idField: 'id' }).pipe(
      map((documentSnapshot: DocumentData | undefined) => {
        if (documentSnapshot) {
          return {
            title: documentSnapshot['title'],
            content: documentSnapshot['content'],
            uid: documentSnapshot['uid'],
            displayName: documentSnapshot['displayName'],
            lastModified: documentSnapshot['lastModified'],
            postedDate: documentSnapshot['postedDate'],
            id: documentSnapshot['id'],
          } as IArticle;
        } else {
          return undefined;
        }
      })
    );
  }

  addArticle(
    title: string,
    content: string,
    uid: string | undefined | null,
    displayName: string | undefined | null,
    postedDate: string | undefined | null,
    lastModified: string | undefined | null
  ) {
    const article = {
      title,
      content,
      uid,
      displayName,
      postedDate,
      lastModified,
    };
    const articlesCollection = collection(this.db, 'articles');
    return addDoc(articlesCollection, article);
  }

  deleteArticle(articleId: string) {
    const articleDocRef = doc(this.db, 'articles', articleId);
    return deleteDoc(articleDocRef);
  }
}
