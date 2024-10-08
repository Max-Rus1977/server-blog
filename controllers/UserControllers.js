import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from '../models/User.js';
import { handleError } from "../utils/handleError.js";

export const getAll = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json(data)

  } catch (error) {
    handleError(res, error)
  }
}

export const register = async (req, res) => {
  try {
    const reqPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(reqPassword, salt);

    const doc = new UserModel({
      email: req.body.email,
      password: passwordHash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const { password, ...userData } = user._doc;

    const token = jwt.sign(
      { _id: user._id },
      'secretKey',
      { expiresIn: '10d' }
    );

    res.json({
      success: true,
      ...userData,
      token
    });

  } catch (error) {
    handleError(res, error);
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        message: 'Пользователь с такой почтой не найден'
        // Но так писать нельзя Нужно писать не верный 'логин или пароль'
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);
    if (!isValidPass) {
      res.status(404).json({
        message: 'Не верный пароль'
        // Но так писать нельзя Нужно писать не верный 'логин или пароль'
      });
    }

    const { password, ...userData } = user._doc;

    const token = jwt.sign(
      { _id: user._id },
      'secretKey',
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      ...userData,
      token
    })

  } catch (error) {
    handleError(res, error);
  }
}

export const getMy = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь с таким ID не найден'
      });
    }

    const { password, ...userData } = user._doc;

    res.json({
      success: true,
      ...userData
    })
  } catch (error) {
    handleError(res, error);
  }
}

