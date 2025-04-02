export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorUsername: string;
  createdAt: Date;
}
