"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={8}
        toastOptions={{
          // Define default options
          className: "rounded-md",
          duration: 3000,
          style: {
            background: "#000",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
          promise: {
            style: {
              minWidth: "250px",
            },
            success: {
              duration: 5000,
            },
          },
        }}
      />
    </div>
  );
};

export default ToasterContext;
