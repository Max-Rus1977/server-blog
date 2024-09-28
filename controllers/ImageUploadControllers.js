export const uploadImg = (req, res) => {
  if (req.file) {
    res.json({
      success: true,
      message: 'Изображение успешно загружено',
      imageUrl: req.file.path
    });

  } else {
    res.status(400).json({
      success: false,
      message: 'Не удалось загрузить изображение'
    });
  }
}