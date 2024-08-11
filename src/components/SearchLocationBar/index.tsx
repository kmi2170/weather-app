import { memo, useState } from "react";
import Image from "next/image";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { asyncThunkSearchLocation } from "../../slice/weatherAsyncThunk";
import { setIsNotFound } from "../../slice/weatherSlice";
import SearchLocationModal from "../Modals/SearchLocation/searchLocationModal";
import { MGlassIcon } from "../../assets/icons";

const icon_search = "/icon-search.png";
const icon_cancel = "/icon-cancel.png";

const queryExamples = ["London", "Seattle,WA,USA", "Tokyo,Japan"];

const SearchLocationBar = () => {
  const isNotFound = useAppSelector((state) => state.weather.isNotFound);
  const dispatch = useAppDispatch();

  const [searchLocation, setSearchLocation] = useState<string>("");

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchLocation(e.target.value);
  };

  const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
    setSearchLocation("");
    dispatch(setIsNotFound(false));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchLocation) {
      dispatch(asyncThunkSearchLocation(searchLocation)).catch((error) =>
        console.error(error)
      );
    }
  };

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SearchLocationModal open={open} handleClose={handleClose} />

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

      <form onSubmit={handleSubmit}>
        <Box
          sx={(theme) => ({
            backgroundColor: "#fff",
            borderRadius: 30,
            margin: "0 5vw",
            [theme.breakpoints?.up("sm")]: {
              margin: "0 10vw",
            },
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          })}
        >
          {/* <IconButton type="submit" size="large">
            <Image
              src={icon_search}
              alt="search button"
              width={20}
              height={20}
            />
          </IconButton> */}
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            {/* <TextField
              fullWidth
              type="text"
              variant="standard"
              value={searchLocation}
              onChange={handleInput}
              placeholder="Search Location; City,State,Country"
              style={{ borderColor: "white" }}
              onClick={handleOpen}
            /> */}
          </Box>
          {/* <IconButton onClick={handleClear} size="large">
            <Image
              src={icon_cancel}
              alt="clear button"
              width={20}
              height={20}
            />
          </IconButton> */}
        </Box>
      </form>
      {isNotFound && (
        <Box
          sx={(theme) => ({
            color: theme.palette.primary.dark,
            marginTop: ".5rem",
          })}
        >
          <Typography variant="h5" align="center">
            No Place Found
          </Typography>
          <Typography
            variant="h6"
            align="center"
            style={{ fontStyle: "italic" }}
          >
            Examples (case insensitive)
          </Typography>
          <Box
            sx={{
              fontStyle: "italic",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {queryExamples.map((example) => (
              <Typography key={example} variant="h6" align="center">
                {example}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default memo(SearchLocationBar);
