"use client";

import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 48,
  p: 4,
};

export default function Search({ modal, closeSearch, data, isLoading, error }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [content, setContent] = useState();
  let stat;

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const handleChange = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchQuery(searchWord);

    if (error) {
      setContent("Failed to load");
    } else if (isLoading) {
      setContent("loading...");
    }
    if (data) {
      const firstArray = data[0].filter((val) => {
        let name = val.name.toLowerCase();
        let description = val.description?.toLowerCase();

        return (name || description).includes(searchWord);
      });

      const secondArray = data[1].filter((val) => {
        let name = val.name.toLowerCase();
        let description = val.description?.toLowerCase();

        return (name || description).includes(searchWord);
      });

      const thirdArray = data[2].filter((val) => {
        let name = val.name.toLowerCase();
        let description = val.description?.toLowerCase();

        return (name || description).includes(searchWord);
      });

      const fourthArray = data[3].filter((val) => {
        let name = val.name.toLowerCase();
        let brand = val.brand?.toLowerCase();
        let model = val.model?.toLowerCase();
        let description = val.description?.toLowerCase();

        return (name || brand || model || description).includes(searchWord);
      });

      if (
        !isObjEmpty(firstArray) ||
        !isObjEmpty(secondArray) ||
        !isObjEmpty(thirdArray) ||
        !isObjEmpty(fourthArray)
      )
        stat = true;
      else stat = false;

      console.log(stat);
      setContent(
        <div className="flex flex-col gap-6">
          {firstArray && !isObjEmpty(firstArray) && (
            <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
              <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
                Categories
              </h1>
              {firstArray.map((category, index) => {
                return (
                  <p key={category.id} className="list-disc text-black">
                    {category.name}
                  </p>
                );
              })}
            </div>
          )}
          {secondArray && !isObjEmpty(secondArray) && (
            <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
              <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
                Parents
              </h1>
              {secondArray.map((parent, index) => {
                return <p key={parent.id}>{parent.name}</p>;
              })}
            </div>
          )}
          {thirdArray && !isObjEmpty(thirdArray) && (
            <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
              <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
                Children
              </h1>
              {thirdArray.map((child, index) => {
                return <p key={child.id}>{child.name}</p>;
              })}
            </div>
          )}
          {fourthArray && !isObjEmpty(fourthArray) && (
            <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
              <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
                Products
              </h1>
              {fourthArray.map((item, index) => {
                return <p key={item.id}>{item.name}</p>;
              })}
            </div>
          )}
        </div>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modal}
      onClose={closeSearch}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      className="backdrop-blur-sm bg-black/40"
    >
      <Fade in={modal}>
        <Box
          sx={style}
          className={`bg-neutral-300 text-neutral-800 absolute ${
            searchQuery ? "top-[40%]" : "top-1/4"
          } left-1/2 w-2/5 max-h-96 overflow-y-scroll no-scrollbar border-2 border-none rounded-lg shadow-2xl shadow-black`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="flex-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <div className="w-full border-b border-neutral-600/60">
                <input
                  type="text"
                  value={searchQuery || ""}
                  className="px-2 md:pl-4 md:pr-16 py-3 w-full rounded-md sm:py-2 flex-1 text-neutral-900 text-lg bg-transparent focus:border-none focus:outline-none"
                  placeholder="Search products..."
                  onChange={handleChange}
                />
              </div>
            </div>
            {searchQuery && (
              <div className="mt-6 h-56 overflow-y-scroll no-scrollbar text-center">
                {content}
              </div>
            )}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
