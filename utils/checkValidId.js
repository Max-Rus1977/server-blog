import mongoose from "mongoose";

export default (param = 'id') => (req, res, next) => {
  const id = req.params[param];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Не корректный ID'
    });
  }

  next();

}