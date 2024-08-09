import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Theme } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: 0,
  borderRadius: "10px",
};

export default function ErrorModal() {
  const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={(theme) => ({
            ...style,
            border: `2px solid ${theme.palette.primary.light}`,
            width: "400px",
            [theme.breakpoints.down("sm")]: {
              width: "350px",
            },
          })}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Failed to load data
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please try again later
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
