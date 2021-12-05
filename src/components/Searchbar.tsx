import { useState } from "react";
import Image from "next/image";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton, InputBase, Typography } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { asyncThunkSearchLocation } from "../features/weatherAsyncThunk";
import { selectWeather, setIsNotFound } from "../features/weatherSlice";

import icon_search from "../../public/icon_search.png";
import icon_cancel from "../../public/icon-cancel.png";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    margin: "0 5vw",
    [theme.breakpoints.up("sm")]: {
      margin: "0 10vw",
    },
  },
  searchSubContainer: {
    display: "flex",
    flexDirection: "row",
  },
  inputBase: {
    // maxWidth: '60vw',
  },
  messageContainer: {
    // background: "white",
    color: purple[800],
    marginTop: ".5rem",
  },
  examQueries: {
    fontStyle: "italic",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

const Searchbar: React.FC = () => {
  const classes = useStyles();

  const { isNotFound } = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();

  const [searchLocation, setSearchLocation] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchLocation(e.target.value);

  const handleClear = () => {
    setSearchLocation("");
    dispatch(setIsNotFound(false));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchLocation) {
      dispatch(asyncThunkSearchLocation(searchLocation));
    }
  };

  return (
    <>
      <div className={classes.searchContainer}>
        <form onSubmit={handleSubmit}>
          <div className={classes.searchSubContainer}>
            <IconButton type="submit">
              <Image
                src={icon_search}
                alt="search icon"
                width={25}
                height={25}
              />
            </IconButton>
            <InputBase
              fullWidth
              type="text"
              value={searchLocation}
              onChange={handleInput}
              placeholder="Search Location; City,State,Country"
            />
            <IconButton onClick={handleClear}>
              <Image
                src={icon_cancel}
                alt="clear icon"
                width={25}
                height={25}
              />
            </IconButton>
          </div>
        </form>
      </div>
      {isNotFound && (
        <div className={classes.messageContainer}>
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
          <div className={classes.examQueries}>
            <Typography variant="h6" align="center">
              London
            </Typography>
            <Typography variant="h6" align="center">
              Seattle,WA,USA
            </Typography>
            <Typography variant="h6" align="center">
              Tokyo,Japan
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default Searchbar;
