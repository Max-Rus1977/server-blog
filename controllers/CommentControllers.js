import CommentModel from "../models/Comments.js";
import { handleError } from "../utils/handleError.js";

export const create = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = new CommentModel({
      text: req.body.text,
      userId: req.userId,
      postId: postId
    });

    const comment = await doc.save();

    res.json({
      success: true,
      message: 'Статья успешно добавлена',
      comment
    });

  } catch (error) {
    handleError(res, error);
  }
};

export const getAll = async (req, res) => {
  try {
    const comments = await CommentModel.find();

    res.json({
      success: true,
      comments
    })

  } catch (error) {
    handleError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { text } = req.body;

    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Комментарий успешно обновлён',
      updatedComment
    })
  } catch (error) {
    handleError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const commentId = req.params.id;
    const doc = await CommentModel.findByIdAndDelete(commentId);

    res.json({
      success: true,
      message: `Комментарий с ID "${doc.id}" и текстом "${doc.text}" успешно удалена`,
      doc
    });

  } catch (error) {
    handleError(res, error);
  }
};
