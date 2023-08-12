import React from "react";
import PageWrapper from "../components/PageWrapper";

const About = () => {
  return (
    <PageWrapper>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            About
          </h1>
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
