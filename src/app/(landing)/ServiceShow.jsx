"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServiceShow() {
  return (
    <div className="h-[80%] my-12 w-full">
      <div className="flex items-center justify-center w-full gap-1/2 bg-neutral-950">
        <div className="px-3 lg:ps-24 basis-1/3 bg-neutral-950 h-[75vh]">
          <div className="w-full h-full flex flex-col items-start justify-center gap-10 text-neutral-50 ps-6">
            <h1 className="text-3xl lg:text-5xl font-semibold">Our Services</h1>
            <p className="text-lg w-fit lg:w-96">
              Browse all the services we offer and witness our peak customer
              service first hand.
            </p>
            <Link
              href="/services"
              className="px-4 py-2 rounded-lg outline outline-1 outline-offset-1 hover:outline-2 outline-yellow-500 transition-all duration-800 ease-in-out"
            >
              Services
            </Link>
          </div>
        </div>
        <div
          className="pe-24 basis-2/3 bg-neutral-100 relative h-[75vh] w-full"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)" }}
        >
          <Image
            src={"/images/uc.png"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
            alt="Help"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
