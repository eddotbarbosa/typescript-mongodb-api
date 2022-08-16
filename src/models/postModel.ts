import {model, Schema, Types} from 'mongoose';

interface IPost {
  author: Types.ObjectId;
  content: 'string';
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  content: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});

const Post = model<IPost>('Post', postSchema);

export default Post;
