import React from "react";
import Image from "next/image";
import getBase64 from "@/app/utils/getBase64";

export default async function PlaceHolder() {
  const images = [
    { id: "1", src: "/images/1.png" },
    { id: "2", src: "/images/2.png" },
    { id: "3", src: "/images/3.png" },
    { id: "4", src: "/images/4.png" },
  ];

  return images.map(async (image) => {
    const base64 = await getBase64(image.src);

    return (
      <Image
        key={image.id}
        src={image.src}
        fill
        alt="1"
        blurDataURL={base64}
        placeholder="blur"
      />
    );
  });
}
