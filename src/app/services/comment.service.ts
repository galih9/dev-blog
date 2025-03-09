import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IComment } from '../types/article';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private db: Firestore = inject(Firestore);

  getComments(postId: string): Observable<IComment[]> {
    const commentsCollection = collection(this.db, 'comments');
    const q = query(commentsCollection, where('postId', '==', postId));
    return collectionData(q, { idField: 'id' }).pipe(
      map((response: any[]) => {
        return response.map((doc: any) => ({
          comment: doc['comment'],
          postId: doc['postId'],
          uid: doc['uid'],
          id: doc['id'],
        }));
      })
    );
  }

  addComment(uid: string | null | undefined, comment: string, postId: string) {
    const c = { comment, uid, postId };
    const commentCollection = collection(this.db, 'comments');
    return addDoc(commentCollection, c);
  }

  deleteComment(commentId: string) {
    const comReff = doc(this.db, 'comments', commentId);
    return deleteDoc(comReff);
  }
}
