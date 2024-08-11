import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ClearIcon, MGlassIcon } from "../../../assets/icons";
import { ChangeEvent, useRef, useState } from "react";
import { purple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { asyncThunkFindLocations } from "../../../slice/locationsAsyncThunk";

const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: 0,
  borderRadius: "10px",
};

type SearchLocationModalProps = {
  open: boolean;
  handleClose(): void;
};

export default function SearchLocationModal(props: SearchLocationModalProps) {
  const { open, handleClose } = props;

  //const isNotFound = useAppSelector((state) => state.weather.isNotFound);
  const locations = useAppSelector((state) => state.locations);
  const dispatch = useAppDispatch();

  console.log(locations);

  const [candidateLocations, setCandidateLocations] = useState([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [isShortCharacter, setIsShortCharacter] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function onTypeWithDebounce(e: ChangeEvent) {
    if (!inputRef.current?.value) return;

    if (inputRef.current.value.length <= 1) {
      if (candidateLocations.length) setCandidateLocations([]);
      if (!isShortCharacter) setIsShortCharacter(true);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      const typedName = inputRef.current?.value as string;
      dispatch(asyncThunkFindLocations(typedName)).catch((error) =>
        console.error(error)
      );
      if (!timerRef.current) {
        return;
      }
      if (isShortCharacter) setIsShortCharacter(false);
      timerRef.current = null;
    }, 500);
  }

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
          <div style={{ position: "relative" }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter City Name"
              onChange={onTypeWithDebounce}
              onKeyDown={() => {}}
              spellCheck="false"
              autoComplete="off"
              style={{
                paddingLeft: 50,
                height: "2rem",
                width: "100%",
                border: `2px solid ${purple[200]}`,
                borderRadius: "10px",
                outline: "none",
              }}
            />
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
                top: 5,
                right: 10,
                color: theme.palette.primary.main,
              })}
            >
              <ClearIcon />
            </Box>
          </div>

          <Typography
            id="modal-modal-title"
            variant="h6"
            align="center"
            sx={{ marginTop: "1rem" }}
          >
            Type more than one character
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            type in city name
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
