import React from "react";
import PageWrapper from "../components/PageWrapper";

const Contact = () => {
  return (
    <PageWrapper>
      <div className="w-full flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 shadow-xl shadow-blue-600/20 dark:shadow-blue-400/10 text-neutral-800 dark:text-neutral-200">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight italic">
          Contact Us
        </h1>
      </div>
    </PageWrapper>
  );
};

export default Contact;
