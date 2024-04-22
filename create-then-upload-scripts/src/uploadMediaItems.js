export async function uploadMediaItems(mediaItemPaths) {
  const uploadedMediaIds = [];
  for (const filePath of mediaItemPaths) {
    try {
      // Upload the media item
      const response = await client.uploadMediaItem({
        file: fs.createReadStream(filePath),
        filename: path.basename(filePath),
      });
      uploadedMediaIds.push(response.id);
    } catch (error) {
      console.error(`Error uploading file ${filePath}:`, error);
    }
  }
  // Return uploaded media item IDs
  return uploadedMediaIds;
}
module.exports = { uploadMediaItems };
