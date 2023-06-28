"use client";
import Image from "next/image";

const ImagePreview = ({ images }) => {
  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => {
        return (
          <div key={index} className="relative h-36 w-36 mb-6 ">
            <Image
              src={image}
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
