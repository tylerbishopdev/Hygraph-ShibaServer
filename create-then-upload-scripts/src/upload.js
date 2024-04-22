import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url"; // Correctly importing fileURLToPath
import { uploadMediaItems } from "./mediaUploader.js";
import { cleanObject } from "./cleanObjects.js";

// Correct usage of fileURLToPath to define __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT; // Your Hygraph Content API endpoint
const HYGRAPH_TOKEN = process.env.HYGRAPH_MIGRATION_TOKEN; // Your Content API token

async function uploadContent() {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../data/vaprops.json"), "utf8")
  );

  for (const key of Object.keys(data)) {
    try {
      const feature = data[key];
      let mediaItemIds = [];
      if (
        feature.MediaItems &&
        Array.isArray(feature.MediaItems) &&
        feature.MediaItems.length > 0
      ) {
        mediaItemIds = await uploadMediaItems(feature.MediaItems);
      }

      const entryData = cleanObject({
        Feature: feature.Feature,
        Overview: feature.Overview,
        ValuePropositionPitch: feature.ValuePropositionPitch,
        KeyBenefits: feature.KeyBenefits,
        TaglinesSlogans: feature.TaglinesSlogans,
        Documentation: feature.Documentation,
        MediaItems: mediaItemIds.join(","),
        Ideas: feature.Ideas,
        ID: feature.ID,
      });

      await axios.post(
        HYGRAPH_ENDPOINT,
        {
          query: `
          mutation CreateFeature($data: FeatureCreateInput!) {
            createFeature(data: $data) {
              id
            }
          }
        `,
          variables: {
            data: entryData,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${HYGRAPH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(`Failed to create entry for ${key}:`, error);
    }
  }
}

export { uploadContent };
