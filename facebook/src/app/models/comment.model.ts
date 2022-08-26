import User from './user.model';

export default interface Comment {
  _id?: string;
  user?: User;
  body?: string;
  isActive?: boolean;
  updateAt?: Date;
  createdAt?: Date
}

export interface EditComment{
  _id?: string,
  body?: string 
}