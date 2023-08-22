import React from "react";
import Image from "next/image";

import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";

export default async function PlaceHolder({ src, id }) {
  const buffer = await fs.readFile(`./public${src}`);
  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Image src={src} fill alt={id} placeholder="blur" blurDataURL={base64} />
  );
}
