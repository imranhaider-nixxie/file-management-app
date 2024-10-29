// Increment view count for a file
router.get('/files/view/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).send({ error: 'File not found' });
    }

    // Increment view count
    file.viewCount += 1;
    await file.save();

    res.status(200).send({ message: 'View count updated', file });
  } catch (error) {
    res.status(500).send({ error: 'Error updating view count' });
  }
});
