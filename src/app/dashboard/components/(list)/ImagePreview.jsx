"use client";
import Image from "next/image";

const ImagePreview = ({ images }) => {
  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => {
        let src;
        if (typeof image === "object") {
          src = URL.createObjectURL(image);
        } else src = image;

        return (
          <div key={index} className="relative h-36 w-36 mb-6 ">
            <Image
              src={src}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              alt="Image"
              className="object-contain rounded-lg"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImagePreview;
