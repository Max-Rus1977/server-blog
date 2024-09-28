import PostModel from "../models/Post.js";
import { handleError } from "./handleError.js";

export default async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Статья не найдена',
      });
    }

    if (post.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав на выполнение этого действия',
      });
    }

    next();

  } catch (error) {
    handleError(res, error);
  }
}