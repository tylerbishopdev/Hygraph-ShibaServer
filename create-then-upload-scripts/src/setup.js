import { Client, SimpleFieldType } from "@hygraph/management-sdk";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

const client = new Client({
  authToken: process.env.HYGRAPH_MIGRATION_TOKEN,
  endpoint: process.env.HYGRAPH_ENDPOINT,
});

async function createSchema() {
  // Create the Feature model
  await client.createModel({
    apiId: "Feature",
    apiIdPlural: "Features",
    displayName: "Feature",
  });

  // Define fields for the Feature model
  const fields = [
    { name: "Feature", type: SimpleFieldType.String },
    { name: "Overview", type: SimpleFieldType.String },
    { name: "ValuePropositionPitch", type: SimpleFieldType.String },
    { name: "KeyBenefits", type: SimpleFieldType.String },
    { name: "TaglinesSlogans", type: SimpleFieldType.String },
    { name: "Documentation", type: SimpleFieldType.String },
    { name: "MediaItems", type: SimpleFieldType.String },
    { name: "Ideas", type: SimpleFieldType.String },
    { name: "ID", type: SimpleFieldType.Int },
    // Add other fields as necessary
  ];

  for (const field of fields) {
    await client.createSimpleField({
      modelApiId: "Feature",
      apiId: field.name,
      displayName: field.name,
      type: field.type,
    });
  }
}

export { createSchema };
