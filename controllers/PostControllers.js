import CommentModel from "../models/Comments.js";
import PostModel from "../models/Post.js";
import { handleError } from "../utils/handleError.js";

export const getPostsByTag = async (req, res) => {
  try {
    const requestedTag = req.query.tag;
    const posts = await PostModel.find({ tags: { $in: [requestedTag] } });

    res.json({
      success: true,
      posts
    })
  } catch (error) {
    handleError(res, error);
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json({
      success: true,
      posts
    });

  } catch (error) {
    handleError(res, error);
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json({
      success: true,
      message: 'Статья успешно добавлена',
      post
    })

  } catch (error) {
    handleError(res, error);
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'Статья не найдена'
      });
    }

    res.json({
      success: true,
      doc
    });

  } catch (error) {
    handleError(res, error);
  }
}

export const update = async (req, res) => {
  try {
    const { title, text, tags, imageUrl } = req.body;
    const postId = req.params.id;
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { title, text, tags, imageUrl } },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Статья успешно обновлена',
      post: updatedPost
    });

  } catch (error) {
    handleError(res, error);
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    await CommentModel.deleteMany({ postId }) // Удаляет все комменты статьи
    const doc = await PostModel.findByIdAndDelete(postId);

    res.json({
      success: true,
      message: `Статья с ID ${doc.id} и заголовком ${doc.title} 
                успешно удалена со всеми комментариями`,
      doc,
    });
  } catch (error) {
    handleError(res, error);
  }
}

export const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentsInPost = await CommentModel
      .find({ postId }).populate('userId', 'fullName avatarUrl');

    res.json({
      success: true,
      message: 'все комментарии к посту',
      commentsInPost
    })

  } catch (error) {
    handleError(res, error);
  }
}