"use client";

import FooterComponents from "@/app/components/FooterComponents";
import { useIcons } from "@/app/utils/CustomIcons";

export default function Icons() {
  const { LocationIcon, PhoneIcon, MessageIcon } = useIcons();

  return (
    <div className="flex flex-col gap-7 items-center">
      <div className="z-10 text-neutral-200 w-3/4 flex flex-col gap-4">
        <div className="flex gap-7">
          <span className="self-center">{LocationIcon}</span>
          <h1 className="text-[17px] self-start">Address</h1>
        </div>
        <p className="text-sm text-neutral-400 ms-12">
          HabteGiorgis Dildy, Piassa, Addis Ababa, Ethiopia
        </p>
      </div>
      <div className="z-10 text-neutral-200 w-3/4 flex flex-col gap-4">
        <div className="flex gap-7">
          <span className="self-center">{PhoneIcon}</span>
          <h1 className="text-[17px] self-center">Lets talk</h1>
        </div>
        <p className="text-sm text-neutral-400 ms-12">+251912345678</p>
      </div>
      <div className="z-10 text-neutral-200 w-3/4 flex flex-col gap-4">
        <div className="flex gap-7">
          <span className="self-center">{MessageIcon}</span>
          <h1 className="text-[17px] self-center">General Support</h1>
        </div>
        <p className="text-sm text-neutral-400 ms-12">MyNemesis6@gmail.com</p>
      </div>
      <div className="z-10 mt-6 lg:mt-12">
        <FooterComponents />
      </div>
    </div>
  );
}
