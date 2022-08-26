import Comment from './comment.model';
export default interface Posts {
    _id?: string;
    user?: string | object;
    title?: string;
    body?: string;
    isActive?: boolean;
    createdAt?: Date | undefined;
    updateAt?: Date | undefined;
    comments?: Comment[]
}
