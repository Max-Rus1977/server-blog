export const handleError = (res, error, message) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: 'Ошибка на сервере, попробуйте позже',
    error: error.message,
  });
} 