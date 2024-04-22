import { createSchema } from "./setup.js";
import { uploadContent } from "./upload.js";

async function run() {
  await createSchema();
  await uploadContent();
}

run().catch(console.error);
