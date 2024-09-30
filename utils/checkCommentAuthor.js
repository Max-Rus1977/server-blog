import CommentModel from '../models/Comments.js';
import { handleError } from './handleError.js';

const checkCommentAuthor = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const authorId = req.userId;
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Комментарий не найдена',
      });
    }

    if (comment.userId.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав на выполнение этого действия',
      });
    }

    next();

  } catch (error) {
    handleError(res, error)
  }
}

export default checkCommentAuthor;