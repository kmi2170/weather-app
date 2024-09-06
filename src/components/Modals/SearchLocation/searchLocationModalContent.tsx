import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ClearIcon, CloseIcon, MGlassIcon } from "../../../assets/icons";

import { purple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { asyncThunkFindLocations } from "../../../slice/locationsAsyncThunk";
import { LocationList } from "./locationList";
import { LocationType } from "../../../api/types";
import { setLocations } from "../../../slice/locationsSlice";
import { setLocation } from "../../../slice/weatherSlice";
import { Location } from "../../../store/initialState";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "800px",
  height: "800px",
  overflowY: "auto",
  boxShadow: 24,
  padding: 4,
  borderRadius: "10px",
};

type SearchLocationModalProps = {
  handleClose(): void;
};

export default function SearchLocationModal(props: SearchLocationModalProps) {
  const { handleClose } = props;

  const { locations } = useAppSelector((state) => state.locations);
  const dispatch = useAppDispatch();

  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [isShortCharacter, setIsShortCharacter] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          setSelectedLocationIndex((prev) => {
            return prev > 0 ? prev - 1 : prev;
          });
          break;
        case "ArrowDown":
          setSelectedLocationIndex((prev) => {
            return prev < locations.length - 1 ? prev + 1 : prev;
          });
          break;
        case "Enter":
          const location = locations[selectedLocationIndex] as LocationType;
          const { name, admin1, country, latitude, longitude } = location;
          const displayLocation = {
            city: name,
            region: admin1,
            country: country,
            lat: latitude,
            lon: longitude,
          } as Location;
          dispatch(setLocation(displayLocation));
          closeModal();
        case "Escape":
          closeModal();
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedLocationIndex, locations]);

  function onTypeWithDebounce(e: ChangeEvent) {
    if (!inputRef.current?.value) return;

    if (inputRef.current.value.length <= 1) {
      if (locations.length !== 0) dispatch(setLocations([]));
      if (!isShortCharacter) setIsShortCharacter(true);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
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

  const handleHoverLocation = useCallback(function handleHoverLocation(
    selectedIdx: number
  ) {
    setSelectedLocationIndex(selectedIdx);
  },
  []);

  const handleClickLocation = useCallback(
    function handleClickLocation(selectedIdx: number) {
      const location = locations[selectedIdx] as LocationType;
      const { name, admin1, country, latitude, longitude } = location;
      const displayLocation = {
        city: name,
        region: admin1,
        country: country,
        lat: latitude,
        lon: longitude,
      } as Location;
      dispatch(setLocation(displayLocation));
      closeModal();
    },
    [locations]
  );

  const clearText = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current?.focus();

      dispatch(setLocations([]));
      setIsShortCharacter(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, []);

  const closeModal = useCallback(() => {
    dispatch(setLocations([]));
    handleClose();
  }, []);

  return (
    <div>
      <Box
        sx={(theme) => ({
          ...style,
          border: `2px solid ${theme.palette.primary.light}`,
          [theme.breakpoints.down("md")]: {
            width: "600px",
          },
          [theme.breakpoints.down("sm")]: {
            width: "350px",
            height: "600px",
          },
        })}
      >
        <CloseButton onClick={closeModal} />

        <div style={{ position: "relative", marginTop: 50 }}>
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
              height: "3rem",
              width: "100%",
              border: `2px solid ${purple[200]}`,
              borderRadius: "10px",
              outline: "none",
            }}
          />
          <MGlassButton />
          <ClearButton onClick={clearText} />
        </div>

        <LocationList
          locations={locations}
          selectedLocationIndex={selectedLocationIndex}
          handleClickLocation={handleClickLocation}
          handleHoverLocation={handleHoverLocation}
        />

        <Message
          isShortCharacter={isShortCharacter}
          listLength={locations.length}
        />
      </Box>
    </div>
  );
}

type MessageProps = {
  isShortCharacter: boolean;
  listLength: number;
};

function Message(props: MessageProps) {
  const { isShortCharacter, listLength } = props;

  return (
    <>
      {isShortCharacter && (
        <Typography variant="h6" align="center" sx={{ marginTop: "1rem" }}>
          Type more than one character
        </Typography>
      )}
      {!isShortCharacter && listLength === 0 && (
        <Typography variant="h6" align="center" sx={{ marginTop: "1rem" }}>
          No Place was Found
        </Typography>
      )}
    </>
  );
}

const MGlassButton = () => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 15,
        left: 10,
        color: theme.palette.primary.main,
      })}
    >
      <MGlassIcon />
    </Box>
  );
};

const ClearButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 15,
        right: 10,
        color: theme.palette.primary.main,
      })}
      onClick={onClick}
    >
      <ClearIcon />
    </Box>
  );
});

const CloseButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: 15,
        right: 20,
        color: theme.palette.primary.main,
      })}
      onClick={onClick}
    >
      <CloseIcon />
    </Box>
  );
});
