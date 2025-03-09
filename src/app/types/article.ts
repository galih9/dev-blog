export interface IUser {
  name: string;
  fullName: string;
  email: string;
  homeAddress: string;
  birthDate: string;
}

export interface ICharJP {
  hira: string;
  alpha: string;
  id: string;
}

export interface IArticle {
  title: string;
  content: string;
  id: string;
  uid?: string | undefined | null;
  displayName?: string | undefined | null;
  postedDate?: string;
  lastModified?: string;
}
export interface IUser {
  uid: string;
  createdAt: string;
  displayName: string;
  email: string;
  lastLogin: string;
  photoUrl: string;
}
export interface IComment {
  comment: string;
  uid: string | undefined | null;
  postId: string;
}