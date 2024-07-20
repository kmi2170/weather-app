import { memo, useState } from 'react';
import Image from 'next/image';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { asyncThunkSearchLocation } from '../../features/weatherAsyncThunk';
import { setIsNotFound } from '../../features/weatherSlice';
import { purple } from '@mui/material/colors';

const icon_search = '/icon-search.png';
const icon_cancel = '/icon-cancel.png';

const useStyles = makeStyles((theme: Theme) => ({
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    margin: '0 5vw',
    [theme.breakpoints.up('sm')]: {
      margin: '0 10vw',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputbar: {
    flexGrow: 1,
  },
  messageContainer: {
    color: purple[800],
    marginTop: '.5rem',
  },
  queryExamples: {
    fontStyle: 'italic',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
}));

const queryExamples = ['London', 'Seattle,WA,USA', 'Tokyo,Japan'];

const SearchLocationBar = () => {
  const classes = useStyles();

  const isNotFound = useAppSelector((state) => state.weather.isNotFound);
  const dispatch = useAppDispatch();

  const [searchLocation, setSearchLocation] = useState<string>('');

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchLocation(e.target.value);
  };

  // const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
  const handleClear = () => {
    setSearchLocation('');
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

  return <>
    <form onSubmit={handleSubmit}>
      <div className={classes.searchContainer}>
        <IconButton type="submit" size="large">
          <Image
            src={icon_search}
            alt="search button"
            width={20}
            height={20}
          />
        </IconButton>
        <div className={classes.searchInputbar}>
          <TextField
            fullWidth
            type="text"
            variant="standard"
            value={searchLocation}
            onChange={handleInput}
            placeholder="Search Location; City,State,Country"
            style={{ borderColor: 'white' }}
          />
        </div>
        <IconButton onClick={handleClear} size="large">
          <Image
            src={icon_cancel}
            alt="clear button"
            width={20}
            height={20}
          />
        </IconButton>
      </div>
    </form>
    {isNotFound && (
      <div className={classes.messageContainer}>
        <Typography variant="h5" align="center">
          No Place Found
        </Typography>
        <Typography
          variant="h6"
          align="center"
          style={{ fontStyle: 'italic' }}
        >
          Examples (case insensitive)
        </Typography>
        <div className={classes.queryExamples}>
          {queryExamples.map((example) => (
            <Typography key={example} variant="h6" align="center">
              {example}
            </Typography>
          ))}
        </div>
      </div>
    )}
  </>;
};

export default memo(SearchLocationBar);
