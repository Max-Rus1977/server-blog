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



// export const getAll = async (req, res) => {
//   try {
//     const posts = await PostModel.find().populate('user').exec();

//     res.json({
//       success: true,
//       posts
//     });

//   } catch (error) {
//     handleError(res, error);
//   }
// }

// export const getOne = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const doc = await PostModel.findOneAndUpdate(
//       { _id: postId },
//       { $inc: { viewsCount: 1 } },
//       { returnDocument: 'after' }
//     )

//     if (!doc) {
//       return res.status(404).json({
//         success: false,
//         message: 'Статья не найдена'
//       });
//     }

//     res.json({
//       success: true,
//       doc
//     });

//   } catch (error) {
//     handleError(res, error);
//   }
// }

// export const remove = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const doc = await PostModel.findByIdAndDelete(postId);

//     res.json({
//       success: true,
//       message: `Статья с ID ${doc.id} и заголовком ${doc.title} успешно удалена`,
//       doc
//     })
//   } catch (error) {
//     handleError(res, error);
//   }
// }

// export const update = async (req, res) => {
//   try {
//     const { title, text, tags, imageUrl } = req.body;
//     const postId = req.params.id;
//     const updatedPost = await PostModel.findByIdAndUpdate(
//       postId,
//       { $set: { title, text, tags, imageUrl } },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: 'Статья успешно обновлена',
//       post: updatedPost
//     });

//   } catch (error) {
//     handleError(res, error);
//   }
// }