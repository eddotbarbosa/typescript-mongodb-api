import {Request, Response} from 'express';
import {Document} from 'mongoose';
import userModel from '../models/userModel';

// user CRUD
const createUser = async function (req: Request, res: Response): Promise<Response> {
  try {
    const newUser = new userModel({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      posts: []
    });

    const user: Document = await newUser.save();

    return res.json(user);
  } catch (err) {
    return res.json({error: err});
  }
};

const readUser = async function (req: Request, res: Response) : Promise<Response> {
  try {
    const user = await userModel.findOne({username: req.params.username});

    if (!user) return res.json({error: 'user does not exist!'});

    return res.json(user);
  } catch (err) {
    return res.json({error: err});
  }
};

const updateUser = async function (req: Request, res: Response):  Promise<Response> {
  try {
    const auth = req.auth;

    const user = await userModel.findOne({_id: auth.id});
    if (!user) return res.json({error: 'user does not exist!'});

    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    await user.save();

    return res.json(user);
  } catch (err) {
    return res.json({error: err});
  }
};


const deleteUser = async function (req: Request, res: Response):  Promise<Response> {
  try {
    const auth = req.auth;

    const user = await userModel.findOne({_id: auth.id});
    if (!user) return res.json({error: 'user does not exist!'});

    await userModel.deleteOne({_id: user.id});

    return res.json({result: 'user successfully deleted!'});
  } catch (err) {
    return res.json({error: err});
  }
};

export default {createUser, readUser, updateUser, deleteUser};
