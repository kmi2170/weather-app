import { memo, useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import SearchLocationModalContent from "../Modals/SearchLocation/searchLocationModalContent";
import { MGlassIcon } from "../../assets/icons";
import theme from "../../theme/theme";

const SearchLocationBar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let keyPressed = {};

    function handleKeyPress(e: KeyboardEvent) {
      keyPressed[e.key] = true;

      if (keyPressed["Control"] && keyPressed["k"]) {
        e.preventDefault();
        handleOpen();
      }
    }

    function deleteKeyPressed(e: KeyboardEvent) {
      delete keyPressed[e.key];
    }

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", deleteKeyPressed);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", deleteKeyPressed);
    };
  }, []);

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
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 4,
              right: 10,
              display: "flex",
              flexDirection: "row",
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            })}
          >
            <Typography
              variant="subtitle2"
              sx={(theme) => ({
                marginRight: "3px",
                padding: "0 2px",
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "5px",
              })}
            >
              CTL
            </Typography>
            <Typography
              variant="subtitle2"
              sx={(theme) => ({
                padding: "0 5px",
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "5px",
              })}
            >
              K
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchLocationBar);
