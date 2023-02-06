import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { passwordValidator } from '../validations/password.validation.js';
import { HTTP_STATUS_CODE } from '../constants/http-status.constant.js';
import devErrorHandler from '../utils/dev-error-handler.util.js';

export const registerUser = devErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const isPasswordValid = passwordValidator(password);
  if (!isPasswordValid) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });
  }
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({
    email: emailLowerCase,
  });
  if (existedUser) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      success: false,
      message: 'User already exists!',
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });
  const { _id: id, photo } = user;
  const token = jwt.sign(
    {
      id,
      name,
      photo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
  res.status(HTTP_STATUS_CODE.CREATED).json({
    success: true,
    result: {
      id,
      name,
      email: user.email,
      photo,
      token,
    },
  });
});

export const loginUser = devErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({
    email: emailLowerCase,
  });
  if (!existedUser) {
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      success: false,
      message: 'User does not exist!',
    });
  }

  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const { _id: id, name, photo } = existedUser;
  const token = jwt.sign(
    {
      id,
      name,
      photo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
  res.status(HTTP_STATUS_CODE.SUCCESS).json({
    success: true,
    result: {
      id,
      name,
      email: emailLowerCase,
      photo,
      token,
    },
  });
});
