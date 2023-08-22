import React from "react";

import MultiLayerParallax from "../MultiLayerParallax";
import Background from "../Background";
import Motto from "../Motto";

export default function HeaderSection() {
  return (
    <div className="overflow-clip">
      <Background />
      <MultiLayerParallax />
      <Motto />
    </div>
  );
}
