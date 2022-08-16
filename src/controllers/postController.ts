import {Request, Response} from 'express';

import postModel from '../models/postModel';
import userModel from '../models/userModel';

// post CRUD
const createPost = async function (req: Request, res: Response): Promise<Response> {
  try {
    const auth = req.auth;

    const newPost = new postModel({
      author: auth._id,
      content: req.body.content
    });

    const post = await newPost.save();

    const user = await userModel.findOne({_id: auth._id});

    user.posts.push(post._id);

    await user.save();

    return res.json(post);
  } catch (err) {
    return res.json({error: err});
  }
};

const readPost = async function (req, res) {
  try {
    const post = await postModel.findOne({_id: req.params.post})
      .populate({path: 'author', select: 'name username'});

    if (!post) return res.json({result: 'post does not exist!'});

    res.json(post);
  } catch (err) {
    res.json({error: err});
  }
};

const updatePost = async function (req: Request, res: Response): Promise<Response> {
  try {
    const auth = req.auth;

    const post = await postModel.findOne({_id: req.body.id});
    if (!post) return res.json({result: 'post does not exist!'});

    if (post.author.toString() !== auth._id) return res.json({result: 'you are not the author of this post!'});

    post.content = req.body.content || post.content;

    await post.save();

    return res.json({result: 'post sucessfully updated!'});
  } catch (err) {
    return res.json({error: err});
  }
};

const deletePost = async function (req: Request, res: Response): Promise<Response> {
  try {
    const auth = req.auth;

    const post = await postModel.findOne({_id: req.body.id});
    if (!post) return res.json({result: 'post does not exist!'});

    if (post.author.toString() !== auth._id) return res.json({result: 'you are not the author of this post!'});

    await postModel.deleteOne({_id: post._id});

    const user = await userModel.findOne({_id: auth._id});

    user.posts.pull(post._id);

    await user.save();

    return res.json({result: 'post successfully deleted!'});
  } catch (err) {
    return res.json({error: err});
  }
};

// posts list
const postsList = async function (req: Request, res: Response): Promise<Response> {
  try {
    const user = await userModel.findOne({username: req.params.username});

    const posts = await postModel.find({author: user._id}).sort({createdAt: -1}).populate({path: 'author', select: 'name username'});

    return res.json(posts);
  } catch (err) {
    return res.json({error: err});
  }
};

export default {createPost, readPost, updatePost, deletePost, postsList};
