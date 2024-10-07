import CommentModel from '../models/Comments.js';

const checkCommentExists = async (req, res, next) => {
  const { id } = req.params;
  const comment = await CommentModel.findById(id);
  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Комментарий не найден',
    });
  }
  next();
};

export default checkCommentExists;