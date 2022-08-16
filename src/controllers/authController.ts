import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {Request, Response} from "express";

import userModel from "../models/userModel";

// sign in and sign out
const signIn = async function (req: Request, res: Response): Promise<Response> {
  try {
    const user = await userModel.findOne({email: req.body.email}).select('+password');
    if (!user) return res.json({result: 'user does not exist!'});

    const comparePasswords = await bcrypt.compare(req.body.password, user.password);
    if (!comparePasswords) return res.json({result: 'password do not match!'});

    const token = jwt.sign({_id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '15m'});

    return res.json({token: token});
  } catch (err) {
    return res.json({error: err});
  }
};

const signOut = async function (req: Request, res: Response): Promise<Response> {
  try {

    //it's a simple start, later add the tokens to a blacklist and etc
    res.removeHeader('authorization');

    return res.json({result: 'user successfully signed out!'});
  } catch (err) {
    return res.json({error: err});
  }
};

// me
const me = async function (req: Request, res: Response): Promise<Response> {
  try {
    const auth = req.auth;

    const user = await userModel.findOne({_id: auth._id}).select('username avatar');
    if (!user) return res.json({result: 'user does not exist!'});

    res.json({status: 'connected', user: user});
  } catch (err) {
    res.json({error: err});
  }
};

export default {signIn, signOut, me};
