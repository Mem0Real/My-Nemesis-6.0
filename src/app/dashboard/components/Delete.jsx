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
          className="text-center bg-neutral-900 text-red-600"
        >
          {`Delete ${deleteData.id}?`}
        </DialogTitle>
        <DialogContent className="bg-neutral-900">
          <DialogContentText id="alert-dialog-description">
            <span className=" text-neutral-200">
              If you proceed, it will be removed from the database permanently!
            </span>
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
