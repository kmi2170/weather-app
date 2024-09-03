import { memo, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import SearchLocationModalContent from "../Modals/SearchLocation/searchLocationModalContent";
import { MGlassIcon } from "../../assets/icons";

const SearchLocationBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // onClose={handleClose}
      >
        <SearchLocationModalContent handleClose={handleClose} />
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <Box
            sx={(theme) => ({
              width: 300,
              [theme.breakpoints.up("md")]: {
                width: 600,
              },
            })}
          >
            <input
              placeholder="Search City"
              onClick={handleOpen}
              style={{
                paddingLeft: 50,
                height: "2rem",
                width: "100%",
                border: "none",
                borderRadius: "10px",
                outline: "none",
                caretColor: "transparent",
              }}
            />
          </Box>
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 5,
              left: 10,
              color: theme.palette.primary.main,
            })}
          >
            <MGlassIcon />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchLocationBar);
