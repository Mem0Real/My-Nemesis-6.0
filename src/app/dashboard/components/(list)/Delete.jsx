"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast } from "react-hot-toast";

export default function Delete({
  deleteAlert,
  closeDeleteModal,
  deleteData,
  setDeleteData,
  deleteItem,
}) {
  const [loading, setLoading] = useState(false);

  const confirmDelete = async (deleteData) => {
    setLoading(() => true);
    const loaderToast = toast.loading(`Removing ${deleteData.data.id}`);

    const res = await deleteItem(deleteData.entry, deleteData.data);
    setLoading(() => false);
    toast.remove(loaderToast);
    if (res?.error) toast.error(res.error, { duration: 10000 });
    else {
      toast.remove(loaderToast);
      toast.success(res.success);
      closeDeleteModal();
      setImageSrc(() => null);
      setImages(() => []);
    }
  };
  return (
    <div className="bg-neutral-800 text-neutral-200">
      <Dialog
        open={deleteAlert}
        onClose={closeDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center text-red-600 underline underline-offset-4 bg-neutral-900"
        >
          {`Delete ${deleteData?.data?.id}?`}
        </DialogTitle>
        <span className="text-md w-full border-y text-center py-3 bg-neutral-900 text-neutral-200 ">
          This Action is Irreversible !
        </span>
        <DialogContent className="text-center bg-neutral-900 text-neutral-200">
          <DialogContentText
            id="alert-dialog-description"
            className="flex flex-col items-center justify-between gap-5 bg-neutral-900 text-neutral-200"
          >
            <span className="text-neutral-200">
              If you proceed, the <b>selected item</b> as well as
              <b> all of it&apos;s children</b> will be removed from the
              database permanently.
            </span>
            <span className="font-semibold text-neutral-200">
              Proceed with Caution
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className=" text-neutral-200 bg-neutral-900">
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button
            disabled={loading}
            onClick={() => confirmDelete(deleteData)}
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
