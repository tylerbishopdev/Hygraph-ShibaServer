// In ./src/mediaUploader.js
import fs from "fs";
import path from "path";
import { Client } from "@hygraph/management-sdk";

const client = new Client({
  authToken: process.env.HYGRAPH_MIGRATION_TOKEN,
  endpoint: process.env.HYGRAPH_ENDPOINT,
});

async function uploadMediaItems(mediaItemPaths, client) {
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

export { uploadMediaItems };
