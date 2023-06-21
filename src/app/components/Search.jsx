"use client";

import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";
import filterData from "../utils/filterData";

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

export default function Search({ modal, closeSearch, data }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [content, setContent] = useState();
  const router = useRouter();

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const handleChange = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchQuery(searchWord);

    if (data) {
      const { firstArray, secondArray, thirdArray, fourthArray } = filterData(
        searchWord,
        data
      );

      if (
        !isObjEmpty(firstArray) ||
        !isObjEmpty(secondArray) ||
        !isObjEmpty(thirdArray) ||
        !isObjEmpty(fourthArray)
      )
        setContent(
          <div className="flex flex-col gap-6">
            {firstArray && !isObjEmpty(firstArray) && (
              <div className="flex flex-col itmes-start gap-4">
                <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
                  Categories
                </h1>
                <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
                  {firstArray.map((category, index) => {
                    return (
                      <p
                        key={category.id}
                        className="list-disc text-black ps-5"
                      >
                        {category.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {secondArray && !isObjEmpty(secondArray) && (
              <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
                <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
                  Parents
                </h1>
                <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
                  {secondArray.map((parent, index) => {
                    return (
                      <p key={parent.id} className="ps-5">
                        {parent.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {thirdArray && !isObjEmpty(thirdArray) && (
              <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
                <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
                  Children
                </h1>
                <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
                  {thirdArray.map((child, index) => {
                    return (
                      <p key={child.id} className="ps-5">
                        {child.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {fourthArray && !isObjEmpty(fourthArray) && (
              <div className="flex flex-col itmes-start gap-4 border-b border-neutral-200">
                <h1 className="text-start md:ms-3 text-lg font-semibold underline w-full">
                  Products
                </h1>
                <div className="ms-5 border-l border-neutral-500 flex flex-col items-start gap-3">
                  {fourthArray.map((item, index) => {
                    return (
                      <p key={item.id} className="ps-5">
                        {item.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeSearch();
    router.push(`/search?q=${searchQuery}`);
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
            searchQuery ? "top-[46%]" : "top-[25%]"
          } left-1/2 w-[96%] md:w-2/5 max-h-96 overflow-y-scroll no-scrollbar border-2 border-none rounded-lg shadow-2xl shadow-black`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="flex-none">
                <button onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
              <div className="flex items-center w-full border-b border-neutral-600/60">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={searchQuery || ""}
                    className="px-2 md:pl-4 md:pr-16 py-3 w-full rounded-md sm:py-2 flex-1 text-neutral-900 text-lg bg-transparent focus:border-none focus:outline-none"
                    placeholder="Search products..."
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
            {searchQuery && (
              <div className="mt-6 h-56 overflow-y-scroll overflow-x-hidden text-start">
                {content}
              </div>
            )}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
