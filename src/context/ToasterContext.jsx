"use client";

import React, { useState, useEffect } from "react";

import { toast, ToastBar, Toaster, resolveValue } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useIcons } from "@/app/utils/CustomIcons";
import { useThemeContext } from "./ThemeProvider";

const ToasterContext = () => {
  const [currentTheme, setCurrentTheme] = useState("");

  const { update } = useThemeContext();

  let theme;

  useEffect(() => {
    const storedTheme = localStorage.getItem("isDarkTheme");
    if (storedTheme === "false") setCurrentTheme("light");
    else setCurrentTheme("dark");
  }, [update]);

  if (currentTheme === "light") {
    theme = {
      // opacity: t.visible ? 1 : 0,
      background: "#bbb",
      color: "#222",
      padding: 8,
    };
  } else
    theme = {
      // opacity: t.visible ? 1 : 0,
      background: "#222",
      color: "#bbb",
      padding: 8,
    };

  {
    /* <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={8}
        toastOptions={{
          // Define default options
          className:
            "rounded-md px-5 text-center bg-neutral-200 dark:bg-neutral-800",
          style: theme,
          // style: {
          //   background: "#222",
          //   color: "#fff",
          // },

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
        containerStyle={{
          top: 65,
          left: 0,
          right: 0,
        }}
      /> */
  }

  const variants = {
    show: {
      // opacity: 1,
      // scale: 1,
      y: 0,
    },
    hide: {
      // opacity: 0,
      // scale: 0.4,
      y: "-5em",
    },
  };
  const { closeIcon } = useIcons();
  // const custom = (
  //   <AnimatePresence>
  //     {t.visible && (
  //       <motion.div
  //         key={t + "toaster"}
  //         animate={t.visible ? "show" : "hide"}
  //         variants={variants}
  //         exit={"hide"}
  //         initial={"hide"}
  //         transition={{ ease: "easeInOut", duration: 0.1 }}
  //         className={`mt-24 rounded-lg border border-neutral-800 dark:border-neutral-200 p-5`}
  //         style={theme}
  //       >
  //         {resolveValue(t.message, t)}
  //       </motion.div>
  //     )}
  //   </AnimatePresence>
  // );
  return (
    <Toaster
      containerStyle={{
        top: 70,
      }}
      toastOptions={{
        blank: {
          style: theme,
          className: "",
        },
        loading: {
          style: theme,
          className: "",
        },
        success: {
          style: theme,
          className: "",
        },
        error: {
          style: theme,
          className: "",
        },
      }}
    >
      {(t) => (
        <AnimatePresence>
          <motion.div
            key="toaster"
            animate={t.visible ? "show" : "hide"}
            variants={variants}
            exit={"hide"}
            initial={"hide"}
            transition={{ duration: 0.5 }}
          >
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <motion.button
                      whileTap={{ scale: 0.7 }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => toast.dismiss(t.id)}
                    >
                      {closeIcon}
                    </motion.button>
                  )}
                </>
              )}
            </ToastBar>
          </motion.div>
        </AnimatePresence>
      )}
    </Toaster>
  );
};

export default ToasterContext;
