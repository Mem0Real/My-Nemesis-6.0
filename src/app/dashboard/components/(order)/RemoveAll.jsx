"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function RemoveAll({
  removeAlert,
  removeData,
  closeRemoveModal,
  removeAll,
}) {
  const confirmDelete = async (removeData) => {
    try {
      await removeAll(removeData);
      closeRemoveModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-neutral-900 text-neutral-200">
      <Dialog
        open={removeAlert}
        onClose={closeRemoveModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center text-red-600 underline underline-offset-4 bg-neutral-900"
        >
          Remove all orders?
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
              If you proceed, all <b>customers</b> as well as all <b>orders</b>{" "}
              will be removed from the database permanently.
            </span>
            <span className="font-semibold text-neutral-200">
              Proceed with Caution.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-neutral-900 text-neutral-200 flex items-center justify-center gap-4">
          <Button onClick={closeRemoveModal}>Cancel</Button>
          <Button
            onClick={() => confirmDelete(removeData)}
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
