import { inject, Injectable  } from '@angular/core';
import { collection, collectionData, Firestore, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IArticle {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private db: Firestore = inject(Firestore);

  getArticle(): Observable<IArticle[]> {
    // collectionData returns a hot observable
    return collectionData(collection(this.db, 'articles')).pipe(
        map((response: any) => {
            // map the returned docs into your IArticle
            return response.map((doc: any) => ({
                title: doc.title,
                content: doc.content
            }));
        })
    );
  }

  addArticle(title: string, content: string) {
    const article = { title, content };
    const articlesCollection = collection(this.db, 'articles');
    return addDoc(articlesCollection, article);
  }
}