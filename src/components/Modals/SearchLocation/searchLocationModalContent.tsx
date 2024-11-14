import {
  ChangeEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ClearIcon, CloseIcon, MGlassIcon } from "../../../assets/icons";

import { purple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { asyncThunkFindLocations } from "../../../slice/locationsAsyncThunk";
import { LocationType } from "../../../api/types/weather";
import { setLocations } from "../../../slice/locationsSlice";
import { setLocation } from "../../../slice/weatherSlice";
import { Location } from "../../../store/initialState";

import { styled, useTheme } from "@mui/material/styles";
import { LocationListItem } from "./locationListItem";

const ListWrapper = styled("div")({
  marginTop: "1.5rem",
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "800px",
  height: "800px",
  maxHeight: "100vh",
  overflowY: "auto",
  boxShadow: 24,
  padding: 4,
  borderRadius: "10px",
};

type SearchLocationModalContentProps = {
  closeModal(): void;
};

const SearchLocationModalContent = forwardRef(
  (props: SearchLocationModalContentProps, ref) => {
    const theme = useTheme();

    const { closeModal } = props;

    const { locations, isLoading, isError } = useAppSelector(
      (state) => state.locations
    );
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
        try {
          dispatch(asyncThunkFindLocations(typedName));
        } catch (error) {
          console.error(error);
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
    // const handleHoverLocation = function handleHoverLocation(
    //   selectedIdx: number
    // ) {
    //   setSelectedLocationIndex(selectedIdx);
    // };

    // const handleClickLocation = function handleClickLocation(
    //   selectedIdx: number
    // ) {
    //   const location = locations[selectedIdx] as LocationType;
    //   const { name, admin1, country, latitude, longitude } = location;
    //   const displayLocation = {
    //     city: name,
    //     region: admin1,
    //     country: country,
    //     lat: latitude,
    //     lon: longitude,
    //   } as Location;
    //   dispatch(setLocation(displayLocation));
    //   closeModal();
    // };
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

          <ListWrapper>
            {locations?.map((location, i) => {
              return (
                <LocationListItem
                  key={i}
                  index={i}
                  location={location}
                  isSelected={selectedLocationIndex === i}
                  handleClickLocation={handleClickLocation}
                  handleHoverLocation={handleHoverLocation}
                />
              );
            })}
          </ListWrapper>

          <Message
            isShortCharacter={isShortCharacter}
            listLength={locations.length}
            isLoading={isLoading}
            isError={isError}
          />
        </Box>
      </div>
    );
  }
);

export default SearchLocationModalContent;

type MessageProps = {
  isShortCharacter: boolean;
  listLength: number;
  isLoading: boolean;
  isError: boolean;
};

function Message(props: MessageProps) {
  const { isShortCharacter, listLength, isLoading, isError } = props;

  let message = "";

  if (!isLoading) {
    if (isShortCharacter) {
      message = "Type more than one character";
    } else if (isError) {
      message = "Something went wrong. Please try again later";
    } else if (listLength === 0) {
      message = "No Place was Found";
    }
  }

  return (
    <>
      {isLoading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      {message && (
        <Typography variant="h6" align="center" sx={{ marginTop: "1rem" }}>
          {message}
        </Typography>
      )}
    </>
  );
}

const MGlassButton = memo(() => {
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
});

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
