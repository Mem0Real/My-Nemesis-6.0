"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useOrderDataContext } from "./Order";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ data, open, handleClose }) {
  const { removeOne } = useOrderDataContext();

  const removeItem = async () => {
    const res = await removeOne(data.entry, data.id);
    console.log("Item removed");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="remove-order-confirmation"
    >
      <DialogTitle className="bg-neutral-900 text-red-600 text-center">{`Remove ${data?.id} from ${data?.entry}?`}</DialogTitle>
      <DialogContent className="bg-neutral-800">
        <DialogContentText
          id="alert-dialog-slide-description"
          className="text-neutral-200 text-center p-6 flex flex-col gap-5 items-center"
        >
          <span>
            This will remove the customer <b>{data?.id}</b> along with all
            his/her orders.
          </span>
          <span>Are you sure you want to continue?</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="bg-neutral-900 flex items-center justify-end gap-5">
        <Button onClick={removeItem} color="error" className="capitalize">
          Remove
        </Button>
        <Button onClick={handleClose} color="primary" className="capitalize">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
