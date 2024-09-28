import { body } from "express-validator";

export const registerValidator = [
  body('email', 'не верный формат почты').isEmail(),
  body('password', 'пароль не меньше 3 символов').isLength({ min: 3 }),
  body('fullName', 'имя не меньше 3 символов').isLength({ min: 5 }),
  body('avatarUrl', 'не верная ссылка').optional().isURL()
];

export const loginValidator = [
  body('email', 'не верный формат почты').isEmail(),
  body('password', 'пароль не меньше 3 символов').isLength({ min: 3 }),
];

export const postCreateValidator = [
  body('title', 'Заголовок должен содержать не менее 3 символов')
    .isLength({ min: 3 }).isString(),
  body('text', 'Статья должна содержать не менее 10 символов')
    .isLength({ min: 10 }).isString(),
  body('tags', 'Неверный формат тегов, должен быть массив строк')
    .optional().isArray().custom((tags) => {
      return tags.every(tag => typeof tag === 'string')
    }),
  body('imageUrl', 'Неверная ссылка на изображение')
    .optional().isString(),
];

export const postUpdateValidator = [
  body('title', 'Заголовок должен содержать не менее 3 символов')
    .optional().isLength({ min: 3 }).isString(),
  body('text', 'Статья должна содержать не менее 10 символов')
    .optional().isLength({ min: 10 }).isString(),
  body('tags', 'Неверный формат тегов, должен быть массив строк')
    .optional().isArray().custom((tags) => {
      return tags.every(tag => typeof tag === 'string')
    }),
  body('imageUrl', 'Неверная ссылка на изображение')
    .optional().isString(),
];