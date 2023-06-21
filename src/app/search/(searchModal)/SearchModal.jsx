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
import filterData from "@/app/utils/filterData";
import Categories from "./(searchData)/Categories";
import Parents from "./(searchData)/Parents";
import Children from "./(searchData)/Children";
import Items from "./(searchData)/Items";

import { useFunctionsContext } from "@/app/components/NavComponents";

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

export default function SearchModal({ modal }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [content, setContent] = useState();
  const router = useRouter();

  const { data, closeSearch } = useFunctionsContext();

  const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const handleChange = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);

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
              <Categories>{firstArray} </Categories>
            )}
            {secondArray && !isObjEmpty(secondArray) && (
              <Parents>{secondArray}</Parents>
            )}
            {thirdArray && !isObjEmpty(thirdArray) && (
              <Children>{thirdArray}</Children>
            )}
            {fourthArray && !isObjEmpty(fourthArray) && (
              <Items>{fourthArray}</Items>
            )}
          </div>
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeSearch();
    setSearchQuery(searchQuery.toLowerCase());
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
              <div className="flex-none -ml-2 mr-2">
                <button onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
              <div className="flex items-center w-full border-b border-neutral-600/60">
                <form onSubmit={handleSubmit}>
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery || ""}
                    className="px-2 pl-4 md:pr-16 py-3 w-full rounded-md sm:py-2 flex-1 text-neutral-900 text-lg bg-transparent focus:border-none focus:outline-none"
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
