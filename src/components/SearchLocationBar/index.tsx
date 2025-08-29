import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useAppDispatch } from "../../store/hooks";
import { setLocations } from "../../slice/locationsSlice";
import SearchLocationModalContent from "../Modals/SearchLocation/searchLocationModalContent";
import { MGlassIcon } from "../../assets/icons";
import useIsMobile from "../../hooks/useIsMobile";
import useKeysToOpenModal from "../../hooks/useKeysToOpenModal";

const SearchLocationBar = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { isMobile } = useIsMobile({ breakpoint: 768 });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setLocations([]));
  };

  useKeysToOpenModal({ isMobile, handleOpen });

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <SearchLocationModalContent closeModal={handleClose} />
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
          {isMobile && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default SearchLocationBar;
