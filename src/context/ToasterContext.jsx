"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={true}
        gutter={8}
        toastOptions={{
          // Define default options
          className: "rounded-md px-5 text-center",
          style: {
            background: "#222",
            color: "#fff",
          },
          // success: {
          //   duration: 3000,
          //   theme: {
          //     primary: "green",
          //     secondary: "black",
          //   },
          // },
          // error: {
          //   duration: 3000,
          //   theme: {
          //     primary: "red",
          //     secondary: "black",
          //   },
          // },
          // promise: {
          //   style: {
          //     minWidth: "250px",
          //   },
          //   success: {
          //     duration: 10000,
          //   },
          // },
        }}
      />
    </div>
  );
};

export default ToasterContext;
