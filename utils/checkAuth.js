import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded._id;
      next();

    } catch (error) {
      console.error(error);

      return res.status(401).json({
        success: false,
        message: 'Не верный токен',
        error: error.message
      });
    }

  } else {
    return res.status(401).json({
      success: false,
      message: 'Что то не так с токен',
    });
  }
}