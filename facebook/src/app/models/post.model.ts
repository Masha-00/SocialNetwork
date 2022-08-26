import Comment from './comment.model';
import User from './user.model';

export default interface Post {
  _id?: string;
  user?: User;
  title?: string;
  body?: string;
  isActive?: boolean;
  updateAt?: Date | undefined;
  createdAt?: Date | undefined;
  comments?: Comment[]
}