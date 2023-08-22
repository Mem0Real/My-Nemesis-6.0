"use server";

import { getPlaiceholder } from "plaiceholder";

import fs from "node:fs/promises";

export default async function getBase64(src) {
  const path = process.cwd();

  const buffer = await fs.readFile(`${path}\\public${src}`);
  const { base64 } = await getPlaiceholder(buffer);
  return base64;

  // return { images, data };
}
