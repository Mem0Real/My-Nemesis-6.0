"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Delete({
  deleteAlert,
  closeDeleteModal,
  deleteData,
  setDeleteData,
  deleteItem,
}) {
  const confirmDelete = async (deleteData) => {
    try {
      deleteItem(deleteData.entry, deleteData.id);
      closeDeleteModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog
        open={deleteAlert}
        onClose={closeDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center bg-neutral-900 text-red-600 underline underline-offset-4"
        >
          {`Delete ${deleteData.id}?`}
        </DialogTitle>
        <span className="bg-neutral-900 text-neutral-200 text-md w-full border-y text-center py-3 ">
          This Action is Irreversible !
        </span>
        <DialogContent className="bg-neutral-900 text-center">
          <DialogContentText
            id="alert-dialog-description"
            className="flex flex-col items-center justify-between gap-5 text-neutral-200"
          >
            <span className=" ">
              If you proceed, the <b>selected item</b> as well as{" "}
              <b>all of it&apos;s children</b> will be removed from the database
              permanently.
            </span>
            <span className="font-semibold">Proceed with Caution</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-neutral-900">
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button
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
